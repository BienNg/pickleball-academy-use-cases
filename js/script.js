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

        // Initially hide sub-categories
        document.querySelectorAll('.nav-item.sub-category').forEach(item => {
            item.style.display = 'none';
        });
    }

    // Search functionality
    function setupSearch() {
        const searchInput = document.getElementById('searchInput');
        
        searchInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const useCaseSections = document.querySelectorAll('.use-case-section');
            
            useCaseSections.forEach(section => {
                const title = section.querySelector('.use-case-title, .flow-item-title')?.textContent.toLowerCase() || '';
                const description = section.querySelector('.use-case-description, .flow-item-description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Navigation filtering - each use case nav item filters to that specific use case
    function setupNavigationFiltering() {
        const navItems = document.querySelectorAll('.nav-item[data-use-case-id]');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active state from all nav items
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');

                const useCaseId = item.dataset.useCaseId;
                const useCaseSections = document.querySelectorAll('.use-case-section');
                
                // Filter use case sections - show only the selected use case
                useCaseSections.forEach(section => {
                    if (section.dataset.useCaseId === useCaseId) {
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
                const useCaseSections = document.querySelectorAll('.use-case-section');
                
                // Show all use cases that belong to this category (check parties)
                useCaseSections.forEach(section => {
                    const useCaseId = section.dataset.useCaseId;
                    // Find the use case in allUseCases to check its parties
                    const useCase = allUseCases.find(uc => uc.id === useCaseId);
                    
                    if (useCase && useCase.parties && useCase.parties.includes(category)) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // Store current step for each use case (shared between functions)
    const stepState = new Map();

    // Function to update step visibility (shared between toggle and navigation)
    function updateStepVisibility(useCaseId, visibleStepCount) {
        const stepsContainer = document.querySelector(`.flow-steps-container[data-use-case-id="${useCaseId}"]`);
        const navControls = document.querySelector(`.step-navigation[data-use-case-id="${useCaseId}"]`);
        
        if (!stepsContainer) return;

        const steps = stepsContainer.querySelectorAll('.flow-step');
        const state = stepState.get(useCaseId);
        
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
                // Remove selected from all steps in this use case
                steps.forEach(s => s.classList.remove('selected'));
                
                // Select the latest visible step
                const latestStep = steps[latestStepIndex];
                latestStep.classList.add('selected');
                
                // Show/hide detail panel based on selected step
                const detailPanel = document.querySelector(`.step-detail-panel[data-use-case-id="${useCaseId}"]`);
                const hasMockup = latestStep.dataset.hasMockup === 'true';
                if (detailPanel) {
                    if (hasMockup) {
                        detailPanel.style.display = 'block';
                        // Hide all mockups and show only the selected step's mockup
                        const allMockups = detailPanel.querySelectorAll('.step-mockup');
                        allMockups.forEach(mockup => {
                            mockup.style.display = 'none';
                        });
                        const selectedMockup = detailPanel.querySelector(`.step-mockup[data-step-index="${latestStepIndex}"]`);
                        if (selectedMockup) {
                            selectedMockup.style.display = 'block';
                        }
                    } else {
                        detailPanel.style.display = 'none';
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
        // Set default to "Complete" mode for all use cases
        document.querySelectorAll('.toggle-option[data-view-mode="complete"]').forEach(btn => {
            btn.classList.add('active');
        });

        // Handle toggle button clicks
        document.querySelectorAll('.toggle-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const useCaseId = btn.dataset.useCaseId;
                const viewMode = btn.dataset.viewMode;
                
                // Update toggle buttons for this use case
                document.querySelectorAll(`.toggle-option[data-use-case-id="${useCaseId}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Show/hide navigation controls
                const navControls = document.querySelector(`.step-navigation[data-use-case-id="${useCaseId}"]`);
                const stepsContainer = document.querySelector(`.flow-steps-container[data-use-case-id="${useCaseId}"]`);
                
                if (viewMode === 'step-by-step') {
                    navControls.style.display = 'flex';
                    // Reset to first step
                    const state = stepState.get(useCaseId);
                    if (state) {
                        state.current = 1;
                    }
                    updateStepVisibility(useCaseId, 1);
                } else {
                    navControls.style.display = 'none';
                    // Show all steps
                    const steps = stepsContainer.querySelectorAll('.flow-step');
                    steps.forEach(step => {
                        step.classList.remove('hidden');
                    });
                    // Clear selection in complete mode
                    steps.forEach(step => step.classList.remove('selected'));
                    const detailPanel = document.querySelector(`.step-detail-panel[data-use-case-id="${useCaseId}"]`);
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
        document.querySelectorAll('.use-case-section[data-use-case-id]').forEach(section => {
            const useCaseId = section.dataset.useCaseId;
            const stepsContainer = section.querySelector('.flow-steps-container');
            if (stepsContainer) {
                const totalSteps = stepsContainer.querySelectorAll('.flow-step').length;
                stepState.set(useCaseId, { current: 1, total: totalSteps });
            }
        });

        // Next button handler
        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const useCaseId = btn.dataset.useCaseId;
                const state = stepState.get(useCaseId);
                if (state && state.current < state.total) {
                    state.current++;
                    updateStepVisibility(useCaseId, state.current);
                }
            });
        });

        // Previous button handler
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const useCaseId = btn.dataset.useCaseId;
                const state = stepState.get(useCaseId);
                if (state && state.current > 1) {
                    state.current--;
                    updateStepVisibility(useCaseId, state.current);
                }
            });
        });
    }

    // Step click - show detail panel and highlight selected step
    function setupStepDetailSelection() {
        document.querySelectorAll('.flow-step[data-use-case-id]').forEach(stepEl => {
            stepEl.addEventListener('click', () => {
                const useCaseId = stepEl.dataset.useCaseId;
                const stepIndex = parseInt(stepEl.dataset.stepIndex, 10);
                const hasMockup = stepEl.dataset.hasMockup === 'true';
                const state = stepState.get(useCaseId);

                // Only allow selecting visible steps in step-by-step mode
                const navControls = document.querySelector(`.step-navigation[data-use-case-id="${useCaseId}"]`);
                const isStepByStepMode = navControls && navControls.style.display !== 'none';
                
                if (isStepByStepMode && state) {
                    // In step-by-step mode, only allow selecting steps up to current visible count
                    const visibleStepCount = state.current;
                    if (stepIndex >= visibleStepCount) {
                        return; // Don't allow selecting hidden steps
                    }
                }

                // Remove selected from all steps in this use case
                document.querySelectorAll(`.flow-step[data-use-case-id="${useCaseId}"]`).forEach(s => {
                    s.classList.remove('selected');
                });
                stepEl.classList.add('selected');

                // Show/hide detail panel based on whether this step has a mockup
                const detailPanel = document.querySelector(`.step-detail-panel[data-use-case-id="${useCaseId}"]`);
                if (detailPanel) {
                    if (hasMockup) {
                        detailPanel.style.display = 'block';
                        // Hide all mockups and show only the selected step's mockup
                        const allMockups = detailPanel.querySelectorAll('.step-mockup');
                        allMockups.forEach(mockup => {
                            mockup.style.display = 'none';
                        });
                        const selectedMockup = detailPanel.querySelector(`.step-mockup[data-step-index="${stepIndex}"]`);
                        if (selectedMockup) {
                            selectedMockup.style.display = 'block';
                        }
                    } else {
                        detailPanel.style.display = 'none';
                    }
                }
            });
        });
    }

    // Keyboard navigation for step-by-step mode
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle arrow keys when not typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Find the active use case section (the one currently visible)
            const visibleUseCase = Array.from(document.querySelectorAll('.use-case-section')).find(section => {
                return section.style.display !== 'none';
            });

            if (!visibleUseCase) return;

            const useCaseId = visibleUseCase.dataset.useCaseId;
            const navControls = document.querySelector(`.step-navigation[data-use-case-id="${useCaseId}"]`);
            
            // Only handle keyboard navigation in step-by-step mode
            if (!navControls || navControls.style.display === 'none') {
                return;
            }

            const state = stepState.get(useCaseId);
            if (!state) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (state.current < state.total) {
                    state.current++;
                    updateStepVisibility(useCaseId, state.current);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (state.current > 1) {
                    state.current--;
                    updateStepVisibility(useCaseId, state.current);
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
