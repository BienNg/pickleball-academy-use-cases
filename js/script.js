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

    // Setup all functionality
    setupCategoryExpansion();
    setupSearch();
    setupNavigationFiltering();
    setupCategoryFiltering();
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
