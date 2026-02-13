// Initialize all functionality after DOM and dynamic content are ready
function initializeApp() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
    }

    mobileMenuBtn?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', toggleSidebar);

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Navigation category expansion
    function setupCategoryExpansion() {
        const mainCategories = document.querySelectorAll('.nav-item.main-category');
        mainCategories.forEach(category => {
            // Remove existing listeners by cloning
            const newCategory = category.cloneNode(true);
            category.parentNode.replaceChild(newCategory, category);
            
            newCategory.addEventListener('click', (e) => {
                const icon = newCategory.querySelector('.expand-icon');
                const isExpanded = icon.classList.contains('expanded');
                
                // Toggle icon
                icon.classList.toggle('expanded');
                
                // Toggle sub-items visibility
                let next = newCategory.nextElementSibling;
                while (next && next.classList.contains('sub-category')) {
                    next.style.display = isExpanded ? 'none' : 'flex';
                    next = next.nextElementSibling;
                }
            });
        });

        // Initially show sub-categories (expanded by default)
        document.querySelectorAll('.nav-item.sub-category').forEach(item => {
            item.style.display = 'flex';
        });
        
        // Mark all categories as expanded
        document.querySelectorAll('.nav-item.main-category .expand-icon').forEach(icon => {
            icon.classList.add('expanded');
        });
    }

    // Search functionality
    function setupSearch() {
        const searchInput = document.getElementById('searchInput');
        
        searchInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const userFlowSections = document.querySelectorAll('.user-flow-section');
            
            userFlowSections.forEach(section => {
                const title = section.querySelector('.user-flow-title, .flow-item-title')?.textContent.toLowerCase() || '';
                const description = section.querySelector('.user-flow-description, .flow-item-description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Navigation filtering - each user flow nav item filters to that specific user flow
    function setupNavigationFiltering() {
        const navItems = document.querySelectorAll('.nav-item[data-user-flow-id]');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active state from all nav items
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');

                const userFlowId = item.dataset.userFlowId;
                const userFlowSections = document.querySelectorAll('.user-flow-section');
                
                // Filter user flow sections - show only the selected user flow
                userFlowSections.forEach(section => {
                    if (section.dataset.userFlowId === userFlowId) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // Category filtering
    function setupCategoryFiltering() {
        const categoryNavItems = document.querySelectorAll('.nav-item.main-category');
        categoryNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('expand-icon')) return;
                
                const category = item.dataset.category;
                const userFlowSections = document.querySelectorAll('.user-flow-section');
                
                // Show all user flows that belong to this category (check parties)
                userFlowSections.forEach(section => {
                    const userFlowId = section.dataset.userFlowId;
                    // Find the user flow in allUserFlows to check its parties
                    const userFlow = allUserFlows.find(uc => uc.id === userFlowId);
                    
                    if (userFlow && userFlow.parties && userFlow.parties.includes(category)) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // Store current step for each user flow (shared between functions)
    const stepState = new Map();

    // Function to update step visibility (shared between toggle and navigation)
    function updateStepVisibility(userFlowId, visibleStepCount) {
        const stepsContainer = document.querySelector(`.flow-steps-container[data-user-flow-id="${userFlowId}"]`);
        const navControls = document.querySelector(`.step-navigation[data-user-flow-id="${userFlowId}"]`);
        
        if (!stepsContainer) return;

        const steps = stepsContainer.querySelectorAll('.flow-step');
        const state = stepState.get(userFlowId);
        
        steps.forEach((step, index) => {
            if (index < visibleStepCount) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });

            // Auto-select the latest visible step (index is 0-based, visibleStepCount is 1-based)
            const latestStepIndex = visibleStepCount - 1;
            if (latestStepIndex >= 0 && latestStepIndex < steps.length) {
                // Remove selected from all steps in this user flow
                steps.forEach(s => s.classList.remove('selected'));
                
                // Select the latest visible step
                const latestStep = steps[latestStepIndex];
                latestStep.classList.add('selected');
                
                // Show/hide detail panel based on selected step
                const detailPanel = document.querySelector(`.step-detail-panel[data-user-flow-id="${userFlowId}"]`);
                const hasMockup = latestStep.dataset.hasMockup === 'true';
                if (detailPanel) {
                    if (hasMockup) {
                        detailPanel.style.display = 'block';
                        // Hide all mockups and show only the selected step's mockup
                        detailPanel.querySelectorAll('.step-mockup').forEach(m => m.classList.remove('step-mockup-visible'));
                        const selectedMockup = detailPanel.querySelector(`.step-mockup[data-step-index="${latestStepIndex}"]`);
                        if (selectedMockup) selectedMockup.classList.add('step-mockup-visible');
                        const party = latestStep.dataset.party || 'editor';
                        detailPanel.setAttribute('data-active-party', party);
                        alignDetailPanelWithStep(detailPanel, latestStep);
                    } else {
                        detailPanel.style.display = 'none';
                        detailPanel.style.transform = '';
                    }
                }
                
                // Scroll the selected step into view
                latestStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

        if (navControls) {
            // Update step counter
            const currentStepSpan = navControls.querySelector('.current-step');
            if (currentStepSpan) {
                currentStepSpan.textContent = visibleStepCount;
            }

            // Update button states
            const prevBtn = navControls.querySelector('.prev-btn');
            const nextBtn = navControls.querySelector('.next-btn');
            
            if (prevBtn) {
                prevBtn.disabled = visibleStepCount === 1;
            }
            if (nextBtn && state) {
                nextBtn.disabled = visibleStepCount === state.total;
            }
        }
    }

    // View mode toggle functionality
    function setupViewModeToggle() {
        // Set default to "Complete" mode for all user flows
        document.querySelectorAll('.toggle-option[data-view-mode="complete"]').forEach(btn => {
            btn.classList.add('active');
        });

        // Handle toggle button clicks
        document.querySelectorAll('.toggle-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userFlowId = btn.dataset.userFlowId;
                const viewMode = btn.dataset.viewMode;
                
                // Update toggle buttons for this user flow
                document.querySelectorAll(`.toggle-option[data-user-flow-id="${userFlowId}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Show/hide navigation controls
                const navControls = document.querySelector(`.step-navigation[data-user-flow-id="${userFlowId}"]`);
                const stepsContainer = document.querySelector(`.flow-steps-container[data-user-flow-id="${userFlowId}"]`);
                
                if (viewMode === 'step-by-step') {
                    navControls.style.display = 'flex';
                    // Reset to first step
                    const state = stepState.get(userFlowId);
                    if (state) {
                        state.current = 1;
                    }
                    updateStepVisibility(userFlowId, 1);
                } else {
                    navControls.style.display = 'none';
                    // Show all steps
                    const steps = stepsContainer.querySelectorAll('.flow-step');
                    steps.forEach(step => {
                        step.classList.remove('hidden');
                    });
                    // Clear selection in complete mode
                    steps.forEach(step => step.classList.remove('selected'));
                    const detailPanel = document.querySelector(`.step-detail-panel[data-user-flow-id="${userFlowId}"]`);
                    if (detailPanel) {
                        detailPanel.style.display = 'none';
                    }
                }
            });
        });
    }

    // Step navigation functionality
    function setupStepNavigation() {
        // Initialize step state
        document.querySelectorAll('.user-flow-section[data-user-flow-id]').forEach(section => {
            const userFlowId = section.dataset.userFlowId;
            const stepsContainer = section.querySelector('.flow-steps-container');
            if (stepsContainer) {
                const totalSteps = stepsContainer.querySelectorAll('.flow-step').length;
                stepState.set(userFlowId, { current: 1, total: totalSteps });
            }
        });

        // Next button handler
        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userFlowId = btn.dataset.userFlowId;
                const state = stepState.get(userFlowId);
                if (state && state.current < state.total) {
                    state.current++;
                    updateStepVisibility(userFlowId, state.current);
                }
            });
        });

        // Previous button handler
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userFlowId = btn.dataset.userFlowId;
                const state = stepState.get(userFlowId);
                if (state && state.current > 1) {
                    state.current--;
                    updateStepVisibility(userFlowId, state.current);
                }
            });
        });
    }

    // Step click - show detail panel and highlight selected step
    function setupStepDetailSelection() {
        document.querySelectorAll('.flow-step[data-user-flow-id]').forEach(stepEl => {
            stepEl.addEventListener('click', () => {
                const userFlowId = stepEl.dataset.userFlowId;
                const stepIndex = parseInt(stepEl.dataset.stepIndex, 10);
                const hasMockup = stepEl.dataset.hasMockup === 'true';
                const state = stepState.get(userFlowId);

                // Only allow selecting visible steps in step-by-step mode
                const navControls = document.querySelector(`.step-navigation[data-user-flow-id="${userFlowId}"]`);
                const isStepByStepMode = navControls && navControls.style.display !== 'none';
                
                if (isStepByStepMode && state) {
                    // In step-by-step mode, only allow selecting steps up to current visible count
                    const visibleStepCount = state.current;
                    if (stepIndex >= visibleStepCount) {
                        return; // Don't allow selecting hidden steps
                    }
                }

                // Remove selected from all steps in this user flow
                document.querySelectorAll(`.flow-step[data-user-flow-id="${userFlowId}"]`).forEach(s => {
                    s.classList.remove('selected');
                });
                stepEl.classList.add('selected');

                // Show/hide detail panel based on whether this step has a mockup
                const detailPanel = document.querySelector(`.step-detail-panel[data-user-flow-id="${userFlowId}"]`);
                if (detailPanel) {
                    if (hasMockup) {
                        detailPanel.style.display = 'block';
                        // Hide all mockups and show only the selected step's mockup
                        detailPanel.querySelectorAll('.step-mockup').forEach(m => m.classList.remove('step-mockup-visible'));
                        const selectedMockup = detailPanel.querySelector(`.step-mockup[data-step-index="${stepIndex}"]`);
                        if (selectedMockup) selectedMockup.classList.add('step-mockup-visible');
                        const party = stepEl.dataset.party || 'editor';
                        detailPanel.setAttribute('data-active-party', party);
                        alignDetailPanelWithStep(detailPanel, stepEl);
                    } else {
                        detailPanel.style.display = 'none';
                        detailPanel.style.transform = '';
                    }
                }
            });
        });
    }

    function alignDetailPanelWithStep(detailPanel, stepEl) {
        if (!detailPanel || !stepEl) return;
        if (window.innerWidth < 768) {
            detailPanel.style.transform = detailPanel.hasAttribute('data-active-party') ? 'scale(1.02)' : '';
            return;
        }
        const layout = stepEl.closest('.flow-steps-layout');
        if (!layout) return;
        const layoutRect = layout.getBoundingClientRect();
        const stepRect = stepEl.getBoundingClientRect();
        const offsetTop = stepRect.top - layoutRect.top;
        const scale = detailPanel.hasAttribute('data-active-party') ? ' scale(1.02)' : '';
        detailPanel.style.transform = `translateY(${offsetTop}px)${scale}`;
    }

    // Keyboard navigation for step-by-step mode
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle arrow keys when not typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Find the active user flow section (the one currently visible)
            const visibleUserFlow = Array.from(document.querySelectorAll('.user-flow-section')).find(section => {
                return section.style.display !== 'none';
            });

            if (!visibleUserFlow) return;

            const userFlowId = visibleUserFlow.dataset.userFlowId;
            const navControls = document.querySelector(`.step-navigation[data-user-flow-id="${userFlowId}"]`);
            
            // Only handle keyboard navigation in step-by-step mode
            if (!navControls || navControls.style.display === 'none') {
                return;
            }

            const state = stepState.get(userFlowId);
            if (!state) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (state.current < state.total) {
                    state.current++;
                    updateStepVisibility(userFlowId, state.current);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (state.current > 1) {
                    state.current--;
                    updateStepVisibility(userFlowId, state.current);
                }
            }
        });
    }

    // Setup all functionality
    setupCategoryExpansion();
    setupSearch();
    setupNavigationFiltering();
    setupCategoryFiltering();
    setupViewModeToggle();
    setupStepNavigation();
    setupStepDetailSelection();
    setupKeyboardNavigation();
}

// Wait for DOM and dynamic content to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure renderer has finished
        setTimeout(initializeApp, 100);
    });
} else {
    setTimeout(initializeApp, 100);
}
