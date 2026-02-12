// Category labels for display
const categoryLabels = {
    'student': 'Student',
    'coach': 'Coach',
    'head-coach': 'Head Coach',
    'admin': 'Admin',
    'customer-success': 'Customer Success Manager',
    'content-manager': 'Content Manager'
};

// Party icons mapping - maps party names/abbreviations to their icons
const partyIcons = {
    'Student': '🎾',
    'student': '🎾',
    'Coach': '👨‍🏫',
    'coach': '👨‍🏫',
    'Head Coach': '👨‍💼',
    'head-coach': '👨‍💼',
    'Admin': '⚙️',
    'admin': '⚙️',
    'Customer Success Manager': '💬',
    'customer-success': '💬',
    'CSM': '💬',
    'Content Manager': '📝',
    'content-manager': '📝',
    'Editor': '📝'
};

// Helper function to get party icon
function getPartyIcon(partyName) {
    return partyIcons[partyName] || '👤';
}

// All use cases with parties property - each use case can belong to multiple categories
const allUseCases = [
    {
        id: 'first-contact-academy',
        parties: ['student', 'customer-success', 'coach', 'content-manager'],
        filter: 'coaching',
        image: '🎓',
        title: 'First contact with Academy',
        description: 'Student Requests a Coaching through Academy',
        steps: [
            {
                party: 'Student',
                action: 'Requests a Coaching through Academy',
                mockup: 'zalo-chat'
            },
            {
                party: 'CSM',
                action: 'Consults',
                mockup: 'zalo-chat-continued'
            },
            {
                party: 'CSM',
                action: 'Schedules first session with coach',
                details: 'Finds a time slot, free coach and court',
                mockup: 'phone-app',
                mockupImage: 'app screenshots/session booked.png'
            },
            {
                party: 'Coach',
                action: 'First Session takes place',
                details: 'Goes through all the shots the first time to rate the skill of every shot to create a roadmap',
                mockup: 'phone-app',
                mockupImage: 'app screenshots/dupr coach.png'
            },
            {
                party: 'Coach',
                action: 'Records the session and sends the recording to CSM'
            },
            {
                party: 'CSM',
                action: 'Checks if student has paid and sends the Recordings to Editor'
            },
            {
                party: 'Editor',
                action: 'Uploads Recordings to App'
            }
        ],
        features: [
            'CSM consults and schedules first session',
            'Finds time slot, free coach and court',
            'Coach records the session',
            'CSM checks payment and sends recordings to Editor',
            'Editor uploads recordings to App'
        ]
    }
];

// Generate flowData grouped by parties (for backward compatibility and rendering)
// Each use case appears in all categories it belongs to
function generateFlowData() {
    const categories = Object.keys(categoryLabels);
    const flowData = [];
    
    categories.forEach(category => {
        const items = allUseCases.filter(useCase => useCase.parties.includes(category));
        if (items.length > 0) {
            flowData.push({
                category: category,
                count: items.length,
                items: items
            });
        }
    });
    
    return flowData;
}

// Export flowData for use in other scripts
const flowData = generateFlowData();
