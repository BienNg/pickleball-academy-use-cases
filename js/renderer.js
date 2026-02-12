// Render navigation from flowData - each use case = one nav item
function renderNavigation() {
    const navList = document.getElementById('navList');
    if (!navList) return;

    navList.innerHTML = flowData.map(section => {
        const useCaseItems = section.items.map(item =>
            `<div class="nav-item sub-category" data-use-case-id="${item.id}">${item.title}</div>`
        ).join('');

        const label = categoryLabels[section.category] || section.category;

        return `
            <div class="nav-item main-category" data-category="${section.category}">
                <span>${label}</span>
                <span class="expand-icon">▼</span>
            </div>
            ${useCaseItems}
        `;
    }).join('');
}

// Render flow sections from data
function renderFlowSections() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = flowData.map(section => {
        const items = section.items.map(item => `
            <div class="flow-item" data-filter="${item.filter}" data-use-case-id="${item.id}">
                <div class="flow-item-image">${item.image}</div>
                <div class="flow-item-content">
                    <h3 class="flow-item-title">${item.title}</h3>
                    <p class="flow-item-description">${item.description}</p>
                    <ul class="flow-item-features">
                        ${item.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        const categoryLabel = categoryLabels[section.category] || section.category;

        return `
            <div class="flow-section" data-category="${section.category}">
                <div class="flow-header">
                    <h2 class="flow-title">${categoryLabel}</h2>
                    <span class="flow-count">${section.count} use cases</span>
                </div>
                <div class="flow-container">
                    <div class="flow-items">
                        ${items}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize rendering when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderNavigation();
        renderFlowSections();
    });
} else {
    renderNavigation();
    renderFlowSections();
}
