// Render navigation from flowData - each use case appears in all categories it belongs to
function renderNavigation() {
    const navList = document.getElementById('navList');
    if (!navList) return;

    navList.innerHTML = flowData.map(section => {
        // Deduplicate items within each category section
        const seenIds = new Set();
        const useCaseItems = section.items
            .filter(item => {
                if (seenIds.has(item.id)) {
                    return false;
                }
                seenIds.add(item.id);
                return true;
            })
            .map(item =>
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

// Render flow sections from data - show step-by-step flows
function renderFlowSections() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Collect all unique use cases
    const uniqueUseCases = new Map();
    flowData.forEach(section => {
        section.items.forEach(item => {
            if (!uniqueUseCases.has(item.id)) {
                uniqueUseCases.set(item.id, item);
            }
        });
    });

    // Render each unique use case
    mainContent.innerHTML = Array.from(uniqueUseCases.values()).map(item => {
        // If use case has steps, render step-by-step flow
        if (item.steps && item.steps.length > 0) {
            const stepsHtml = item.steps.map((step, index) => {
                const partyIcon = getPartyIcon(step.party);
                const hasMockupAttr = step.mockup ? ` data-has-mockup="true"` : '';
                return `
                <div class="flow-step" data-step-index="${index}" data-use-case-id="${item.id}"${hasMockupAttr}>
                    <div class="flow-step-connector"></div>
                    <div class="flow-step-content">
                        <div class="flow-step-party">
                            <span class="flow-step-party-icon">${partyIcon}</span>
                            <span class="flow-step-party-name">${step.party}</span>
                        </div>
                        <div class="flow-step-action">${step.action}</div>
                        ${step.details ? `<div class="flow-step-details">${step.details}</div>` : ''}
                    </div>
                </div>
            `;
            }).join('');

            const hasMockup = item.steps.some(s => s.mockup === 'zalo-chat');
            const mockupPanelHtml = hasMockup ? `
                <div class="step-detail-panel" data-use-case-id="${item.id}" style="display: none;">
                    <div class="step-mockup">
                        <div class="phone-mockup">
                            <div class="phone-screen">
                                <div class="phone-notch"></div>
                                <div class="zalo-chat">
                                    <div class="zalo-header">
                                        <span class="zalo-back">←</span>
                                        <div class="zalo-contact">
                                            <span class="zalo-avatar">🏫</span>
                                            <span class="zalo-name">Pickleball Academy</span>
                                            <span class="zalo-status">Zalo Official Account</span>
                                        </div>
                                    </div>
                                    <div class="zalo-messages">
                                        <div class="zalo-message zalo-outgoing">
                                            <span class="zalo-bubble">Chào academy, tôi muốn đăng ký học tại academy! 🎾</span>
                                            <span class="zalo-time">14:32</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ` : '';

            return `
                <div class="use-case-section" data-use-case-id="${item.id}">
                    <div class="use-case-header">
                        <div class="use-case-icon">${item.image}</div>
                        <div class="use-case-title-section">
                            <h2 class="use-case-title">${item.title}</h2>
                            <p class="use-case-description">${item.description}</p>
                        </div>
                    </div>
                    <div class="view-mode-controls">
                        <div class="view-mode-toggle">
                            <button class="toggle-option ${item.id}-toggle" data-view-mode="complete" data-use-case-id="${item.id}">Complete</button>
                            <button class="toggle-option ${item.id}-toggle" data-view-mode="step-by-step" data-use-case-id="${item.id}">Step-by-Step</button>
                        </div>
                        <div class="step-navigation" data-use-case-id="${item.id}" style="display: none;">
                            <button class="nav-btn prev-btn" data-use-case-id="${item.id}" disabled>
                                <span>←</span> Previous
                            </button>
                            <span class="step-counter">
                                <span class="current-step">1</span> / <span class="total-steps">${item.steps.length}</span>
                            </span>
                            <button class="nav-btn next-btn" data-use-case-id="${item.id}">
                                Next <span>→</span>
                            </button>
                        </div>
                    </div>
                    <div class="flow-steps-layout">
                        <div class="flow-steps-container" data-use-case-id="${item.id}">
                            ${stepsHtml}
                        </div>
                        ${mockupPanelHtml}
                    </div>
                </div>
            `;
        } else {
            // Render as card for use cases without steps
            return `
                <div class="use-case-section" data-use-case-id="${item.id}">
                    <div class="flow-item" data-filter="${item.filter}" data-use-case-id="${item.id}">
                        <div class="flow-item-image">${item.image}</div>
                        <div class="flow-item-content">
                            <h3 class="flow-item-title">${item.title}</h3>
                            <p class="flow-item-description">${item.description}</p>
                            <ul class="flow-item-features">
                                ${item.features ? item.features.map(feature => `<li>${feature}</li>`).join('') : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
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
