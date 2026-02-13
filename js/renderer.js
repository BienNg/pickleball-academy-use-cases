// Reusable function to render phone mockup with an image
function renderPhoneMockup(imagePath, altText = 'App Screenshot', stepIndex) {
    return `
        <div class="step-mockup" data-step-index="${stepIndex}">
            <div class="phone-mockup">
                <div class="phone-screen">
                    <div class="phone-notch"></div>
                    <img src="${imagePath}" alt="${altText}" class="phone-app-image" />
                </div>
            </div>
        </div>
    `;
}

// Render navigation from flowData - each user flow appears in all categories it belongs to
function renderNavigation() {
    const navList = document.getElementById('navList');
    if (!navList) return;

    navList.innerHTML = flowData.map(section => {
        // Deduplicate items within each category section
        const seenIds = new Set();
        const userFlowItems = section.items
            .filter(item => {
                if (seenIds.has(item.id)) {
                    return false;
                }
                seenIds.add(item.id);
                return true;
            })
            .map(item =>
                `<div class="nav-item sub-category" data-user-flow-id="${item.id}">${item.title}</div>`
            ).join('');

        const label = categoryLabels[section.category] || section.category;

        return `
            <div class="nav-item main-category" data-category="${section.category}">
                <span>${label}</span>
                <span class="expand-icon">▼</span>
            </div>
            ${userFlowItems}
        `;
    }).join('');
}

// Render flow sections from data - show step-by-step flows
function renderFlowSections() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Collect all unique user flows
    const uniqueUserFlows = new Map();
    flowData.forEach(section => {
        section.items.forEach(item => {
            if (!uniqueUserFlows.has(item.id)) {
                uniqueUserFlows.set(item.id, item);
            }
        });
    });

    // Render each unique user flow
    mainContent.innerHTML = Array.from(uniqueUserFlows.values()).map(item => {
        // If user flow has steps, render step-by-step flow
        if (item.steps && item.steps.length > 0) {
            const stepsHtml = item.steps.map((step, index) => {
                const partySlug = getPartySlug(step.party);
                const hasMockupAttr = step.mockup ? ` data-has-mockup="true" data-mockup-type="${step.mockup}"` : '';
                const stepIcon = step.stepIcon || getPartyIcon(step.party);
                return `
                <div class="flow-step" data-step-index="${index}" data-user-flow-id="${item.id}" data-party="${partySlug}"${hasMockupAttr}>
                    <div class="flow-step-connector"></div>
                    <div class="flow-step-content">
                        <span class="flow-step-badge party-badge-${partySlug}"><span class="party-icon">${stepIcon}</span> ${step.party.toUpperCase()}</span>
                        <div class="flow-step-action">${step.action}</div>
                        ${step.details ? `<div class="flow-step-details">${step.details}</div>` : ''}
                    </div>
                </div>
            `;
            }).join('');

            // Create mockup panel that will show different content based on selected step
            const hasAnyMockup = item.steps.some(s => s.mockup);
            const mockupPanelHtml = hasAnyMockup ? `
                <div class="step-detail-panel" data-user-flow-id="${item.id}" style="display: none;">
                    ${item.steps.map((step, index) => {
                        if (!step.mockup) return '';
                        
                        let mockupContent = '';
                        
                        if (step.mockup === 'zalo-chat') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
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
                            `;
                        } else if (step.mockup === 'zalo-chat-continued') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
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
                                                    <div class="zalo-message zalo-incoming">
                                                        <span class="zalo-bubble">Chào bạn! Cảm ơn bạn đã quan tâm đến Pickleball Academy. Bạn có thể cho tôi biết trình độ hiện tại của bạn và mục tiêu học tập không?</span>
                                                        <span class="zalo-time">14:33</span>
                                                    </div>
                                                    <div class="zalo-message zalo-outgoing">
                                                        <span class="zalo-bubble">Tôi là người mới bắt đầu, muốn học từ cơ bản đến nâng cao</span>
                                                        <span class="zalo-time">14:34</span>
                                                    </div>
                                                    <div class="zalo-message zalo-incoming">
                                                        <span class="zalo-bubble">Tuyệt vời! Chúng tôi có các khóa học phù hợp cho người mới bắt đầu. Bạn có muốn tôi sắp xếp một buổi học thử với coach không?</span>
                                                        <span class="zalo-time">14:35</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'phone-app' && step.mockupImage) {
                            const altText = step.action || 'App Screenshot';
                            mockupContent = renderPhoneMockup(step.mockupImage, altText, index);
                        } else if (step.mockup === 'camera-upload') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="animation-mockup camera-upload-animation">
                                        <div class="anim-icon anim-camera">📹</div>
                                        <div class="anim-arrow">→</div>
                                        <div class="anim-icon anim-cloud">☁️</div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'payment-editor') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="animation-mockup payment-editor-animation">
                                        <div class="anim-icon anim-payment">💳</div>
                                        <div class="anim-arrow">→</div>
                                        <div class="anim-icon anim-recordings">📁</div>
                                        <span class="anim-label">Editor</span>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'editor-upload') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="animation-mockup editor-upload-animation">
                                        <div class="anim-icon anim-edit">✂️</div>
                                        <div class="anim-arrow">→</div>
                                        <div class="anim-icon anim-phone">📱</div>
                                        <span class="anim-label">App</span>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'dashboard-view') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="dashboard-view-mockup">
                                        <div class="dashboard-sidebar"></div>
                                        <div class="dashboard-main">
                                            <div class="dashboard-header">Session Review</div>
                                            <div class="session-grid">
                                                <div class="session-thumbnail session-thumbnail-active">
                                                    <div class="thumbnail-placeholder"></div>
                                                    <div class="thumbnail-label">Session 1 - John Doe</div>
                                                    <div class="thumbnail-time">Yesterday 2:30 PM</div>
                                                </div>
                                                <div class="session-thumbnail">
                                                    <div class="thumbnail-placeholder"></div>
                                                    <div class="thumbnail-label">Session 2 - Jane Smith</div>
                                                    <div class="thumbnail-time">Yesterday 4:15 PM</div>
                                                </div>
                                                <div class="session-thumbnail">
                                                    <div class="thumbnail-placeholder"></div>
                                                    <div class="thumbnail-label">Session 3 - Bob Lee</div>
                                                    <div class="thumbnail-time">Yesterday 6:00 PM</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'video-thumbnail') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="video-thumbnail-mockup">
                                        <div class="split-video-container">
                                            <div class="video-panel video-before">
                                                <div class="video-label">Before</div>
                                                <div class="video-preview"></div>
                                            </div>
                                            <div class="video-panel video-after">
                                                <div class="video-label">After</div>
                                                <div class="video-preview video-improved"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'app-screen') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="app-screen-mockup">
                                        <div class="transcript-header">Transcript</div>
                                        <div class="waveform-container">
                                            <div class="waveform"></div>
                                        </div>
                                        <div class="transcript-content">
                                            <div class="transcript-line">Coach: "Let's work on your serve technique..."</div>
                                            <div class="transcript-line transcript-highlight">Coach: "Focus on keeping your wrist firm and follow through completely."</div>
                                            <div class="transcript-line">Coach: "That's much better! Notice the difference?"</div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'ai-voice-animation') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="animation-mockup ai-voice-animation">
                                        <div class="ai-voice-text">"The key improvement was maintaining wrist stability..."</div>
                                        <div class="soundwave-container">
                                            <div class="soundwave-bar"></div>
                                            <div class="soundwave-bar"></div>
                                            <div class="soundwave-bar"></div>
                                            <div class="soundwave-bar"></div>
                                            <div class="soundwave-bar"></div>
                                        </div>
                                        <div class="ai-voice-icon">🔊</div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'video-thumbnail-vertical') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="vertical-video-mockup">
                                        <div class="vertical-video-frame">
                                            <div class="video-content"></div>
                                            <div class="video-subtitle">"Focus on keeping your wrist firm..."</div>
                                        </div>
                                        <div class="video-timeline">
                                            <div class="timeline-progress"></div>
                                            <div class="timeline-label">0:30</div>
                                        </div>
                                        <div class="export-progress">
                                            <div class="progress-bar"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'clip-transfer-animation') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="animation-mockup clip-transfer-animation">
                                        <div class="transfer-panel transfer-from">
                                            <div class="panel-label">Editor</div>
                                            <div class="clip-icon">🎬</div>
                                        </div>
                                        <div class="anim-arrow">→</div>
                                        <div class="transfer-panel transfer-to">
                                            <div class="panel-label">CSM</div>
                                            <div class="notification-badge">1</div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'social-publish-screen') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="social-publish-mockup">
                                        <div class="publish-split">
                                            <div class="publish-panel publish-message">
                                                <div class="panel-header">Send to Student</div>
                                                <div class="message-preview">
                                                    <div class="message-bubble">Check out your improvement! 🎾</div>
                                                    <div class="message-attachment">📹 Clip attached</div>
                                                </div>
                                            </div>
                                            <div class="publish-panel publish-social">
                                                <div class="panel-header">Social Media Preview</div>
                                                <div class="social-post">
                                                    <div class="post-header">
                                                        <div class="post-avatar">🏫</div>
                                                        <div class="post-name">Pickleball Academy</div>
                                                    </div>
                                                    <div class="post-content"></div>
                                                    <div class="post-engagement">
                                                        <span class="engagement-icon">❤️</span>
                                                        <span class="engagement-icon">💬</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'curriculum-planning-board') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="curriculum-planning-mockup">
                                        <div class="curriculum-header">Curriculum Planning Board</div>
                                        <div class="level-columns">
                                            <div class="level-column level-column-1">
                                                <div class="level-label">Level 1</div>
                                                <div class="level-subtitle">Beginner</div>
                                                <div class="level-benchmarks">
                                                    <div class="benchmark-item">Basic grip & stance</div>
                                                    <div class="benchmark-item">Serve consistency</div>
                                                    <div class="benchmark-item">Court awareness</div>
                                                </div>
                                            </div>
                                            <div class="level-column level-column-2">
                                                <div class="level-label">Level 2</div>
                                                <div class="level-subtitle">Advanced</div>
                                                <div class="level-benchmarks">
                                                    <div class="benchmark-item">Shot placement</div>
                                                    <div class="benchmark-item">Rally control</div>
                                                    <div class="benchmark-item">Strategy basics</div>
                                                </div>
                                            </div>
                                            <div class="level-column level-column-3">
                                                <div class="level-label">Level 3</div>
                                                <div class="level-subtitle">Competitive</div>
                                                <div class="level-benchmarks">
                                                    <div class="benchmark-item">Advanced tactics</div>
                                                    <div class="benchmark-item">Match play</div>
                                                    <div class="benchmark-item">Performance metrics</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'shot-categories-animation') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="shot-categories-mockup">
                                        <div class="curriculum-core">Curriculum Core</div>
                                        <div class="shot-categories-radial">
                                            <div class="shot-category shot-serve">Serve</div>
                                            <div class="shot-category shot-return">Return</div>
                                            <div class="shot-category shot-dink">Dink</div>
                                            <div class="shot-category shot-volley">Volley</div>
                                            <div class="shot-category shot-drive">Drive</div>
                                            <div class="shot-category shot-reset">Reset</div>
                                            <div class="shot-category shot-transition">Transition</div>
                                            <div class="shot-category shot-footwork">Footwork</div>
                                            <div class="shot-category shot-strategy">Strategy</div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'shot-breakdown-document') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="shot-breakdown-mockup">
                                        <div class="document-header">Shot Breakdown Document</div>
                                        <div class="document-section">
                                            <div class="section-title">Technique</div>
                                            <div class="section-content">
                                                <div class="bullet-point">Proper grip position</div>
                                                <div class="bullet-point">Body positioning</div>
                                                <div class="bullet-point">Follow-through motion</div>
                                            </div>
                                        </div>
                                        <div class="document-section">
                                            <div class="section-title">Key Cues</div>
                                            <div class="section-content">
                                                <div class="bullet-point">Keep wrist firm</div>
                                                <div class="bullet-point">Contact point timing</div>
                                            </div>
                                        </div>
                                        <div class="document-section">
                                            <div class="section-title">Common Errors</div>
                                            <div class="section-content">
                                                <div class="bullet-point">Over-rotating</div>
                                                <div class="bullet-point">Late contact</div>
                                            </div>
                                        </div>
                                        <div class="document-section">
                                            <div class="section-title">Evaluation Criteria</div>
                                            <div class="section-content">
                                                <div class="checklist-item">✓ Accuracy test</div>
                                                <div class="checklist-item">✓ Consistency score</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'drill-progression') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="drill-progression-mockup">
                                        <div class="drill-level-indicator">
                                            <span class="level-indicator active">Level 1</span>
                                            <span class="level-arrow">→</span>
                                            <span class="level-indicator">Level 2</span>
                                            <span class="level-arrow">→</span>
                                            <span class="level-indicator">Level 3</span>
                                        </div>
                                        <div class="drill-panels">
                                            <div class="drill-panel drill-isolated">
                                                <div class="drill-label">Isolated Repetition</div>
                                                <div class="drill-visual"></div>
                                            </div>
                                            <div class="drill-panel drill-controlled">
                                                <div class="drill-label">Controlled Rally</div>
                                                <div class="drill-visual"></div>
                                            </div>
                                            <div class="drill-panel drill-live">
                                                <div class="drill-label">Live Point Scenario</div>
                                                <div class="drill-visual"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'assessment-checklist') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="assessment-checklist-mockup">
                                        <div class="assessment-header">Evaluation & Level-Up Criteria</div>
                                        <div class="assessment-metrics">
                                            <div class="metric-item">
                                                <div class="metric-label">Skill Test Score</div>
                                                <div class="progress-bar-container">
                                                    <div class="progress-bar-fill progress-75"></div>
                                                </div>
                                                <div class="metric-score">75/100</div>
                                            </div>
                                            <div class="metric-item">
                                                <div class="metric-label">Consistency Rate</div>
                                                <div class="progress-bar-container">
                                                    <div class="progress-bar-fill progress-68"></div>
                                                </div>
                                                <div class="metric-score">68%</div>
                                            </div>
                                            <div class="metric-item">
                                                <div class="metric-label">Pass Threshold</div>
                                                <div class="checkmark-indicator">✓</div>
                                                <div class="metric-score">Met</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'master-document') {
                            mockupContent = `
                                <div class="step-mockup" data-step-index="${index}">
                                    <div class="master-document-mockup">
                                        <div class="document-branding">
                                            <div class="academy-logo">🏫</div>
                                            <div class="document-title">Master Coaching Curriculum</div>
                                        </div>
                                        <div class="document-toc">
                                            <div class="toc-section toc-expanded">
                                                <div class="toc-header">Levels</div>
                                                <div class="toc-items">
                                                    <div class="toc-item">Level 1: Beginner</div>
                                                    <div class="toc-item">Level 2: Advanced</div>
                                                    <div class="toc-item">Level 3: Competitive</div>
                                                </div>
                                            </div>
                                            <div class="toc-section">
                                                <div class="toc-header">Shot Library</div>
                                            </div>
                                            <div class="toc-section">
                                                <div class="toc-header">Drill Library</div>
                                            </div>
                                            <div class="toc-section">
                                                <div class="toc-header">Evaluation System</div>
                                            </div>
                                            <div class="toc-section">
                                                <div class="toc-header">Coaching Standards</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (step.mockup === 'approval-stamp') {
                            mockupContent = `
                                <div class="step-mockup step-mockup-animation" data-step-index="${index}">
                                    <div class="approval-stamp-mockup">
                                        <div class="document-final">
                                            <div class="academy-logo-bg">🏫</div>
                                            <div class="approval-stamp">APPROVED</div>
                                            <div class="approval-glow"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        return mockupContent;
                    }).join('')}
                </div>
            ` : '';

            const dailyBadge = item.id === 'creating-session-success-clips' ? '<span class="daily-badge">Daily</span>' : '';
            const systemBadge = item.badge ? `<span class="system-badge">${item.badge}</span>` : '';
            const subtitle = item.subtitle ? `<p class="user-flow-subtitle">${item.subtitle}</p>` : '';
            const description = item.description ? `<p class="user-flow-description">${item.description}</p>` : '';
            return `
                <div class="user-flow-section" data-user-flow-id="${item.id}">
                    <div class="user-flow-header">
                        <div class="user-flow-icon">${item.image}</div>
                        <div class="user-flow-title-section">
                            <h2 class="user-flow-title">${item.title}${dailyBadge}</h2>
                            ${subtitle}
                            ${description}
                            ${systemBadge}
                        </div>
                    </div>
                    <div class="view-mode-controls">
                        <div class="view-mode-toggle">
                            <button class="toggle-option ${item.id}-toggle" data-view-mode="complete" data-user-flow-id="${item.id}">Complete</button>
                            <button class="toggle-option ${item.id}-toggle" data-view-mode="step-by-step" data-user-flow-id="${item.id}">Step-by-Step</button>
                        </div>
                        <div class="step-navigation" data-user-flow-id="${item.id}" style="display: none;">
                            <button class="nav-btn prev-btn" data-user-flow-id="${item.id}" disabled>
                                <span>←</span> Previous
                            </button>
                            <span class="step-counter">
                                <span class="current-step">1</span> / <span class="total-steps">${item.steps.length}</span>
                            </span>
                            <button class="nav-btn next-btn" data-user-flow-id="${item.id}">
                                Next <span>→</span>
                            </button>
                        </div>
                    </div>
                    <div class="flow-steps-layout">
                        ${mockupPanelHtml}
                        <div class="flow-steps-container" data-user-flow-id="${item.id}">
                            ${stepsHtml}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Render as card for user flows without steps
            return `
                <div class="user-flow-section" data-user-flow-id="${item.id}">
                    <div class="flow-item" data-filter="${item.filter}" data-user-flow-id="${item.id}">
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
