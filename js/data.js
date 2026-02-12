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
    // Student use cases
    {
        id: 'student-personalized-training',
        parties: ['student'],
        filter: 'training',
        image: '🎾',
        title: 'Personalized Training Programs',
        description: 'Get customized training plans tailored to your skill level, goals, and schedule.',
        features: ['Skill assessment', 'Custom routines', 'Progress tracking']
    },
    {
        id: 'student-court-booking',
        parties: ['student'],
        filter: 'booking',
        image: '📅',
        title: 'Easy Court Reservations',
        description: 'Book courts instantly with real-time availability. Manage your bookings seamlessly.',
        features: ['Real-time availability', 'Instant confirmation', 'Calendar sync']
    },
    {
        id: 'student-find-partners',
        parties: ['student'],
        filter: 'partners',
        image: '👥',
        title: 'Find Playing Partners',
        description: 'Connect with players at your skill level. Join games and build your community.',
        features: ['Skill-based matching', 'Game invitations', 'Community events']
    },
    {
        id: 'student-performance-analytics',
        parties: ['student'],
        filter: 'analytics',
        image: '📊',
        title: 'Performance Analytics',
        description: 'Deep insights into your game performance. Track statistics and optimize training.',
        features: ['Match statistics', 'Performance trends', 'Goal tracking']
    },
    {
        id: 'student-workout-routines',
        parties: ['student'],
        filter: 'training',
        image: '🏃',
        title: 'Workout Routines',
        description: 'Access curated workout routines designed specifically for pickleball players.',
        features: ['Strength training', 'Agility drills', 'Recovery exercises']
    },
    // Coach use cases
    {
        id: 'coach-dashboard',
        parties: ['coach'],
        filter: 'dashboard',
        image: '👨‍🏫',
        title: 'Coach Dashboard',
        description: 'Manage your students, schedule lessons, and track progress all in one place.',
        features: ['Student management', 'Lesson scheduling', 'Progress reports']
    },
    {
        id: 'coach-video-analysis',
        parties: ['coach'],
        filter: 'video',
        image: '📹',
        title: 'Video Analysis Tools',
        description: 'Upload and analyze gameplay videos with detailed feedback and annotations.',
        features: ['Video upload', 'Frame analysis', 'Annotation tools']
    },
    {
        id: 'coach-student-management',
        parties: ['coach'],
        filter: 'students',
        image: '📚',
        title: 'Student Management',
        description: 'Organize student information, track attendance, and manage lesson plans.',
        features: ['Student profiles', 'Attendance tracking', 'Lesson plans']
    },
    {
        id: 'coach-payment-management',
        parties: ['coach'],
        filter: 'dashboard',
        image: '💰',
        title: 'Payment Management',
        description: 'Handle payments, invoices, and billing for your coaching services.',
        features: ['Payment processing', 'Invoice generation', 'Payment history']
    },
    // Head Coach use cases
    {
        id: 'head-coach-coach-management',
        parties: ['head-coach'],
        filter: 'coach-management',
        image: '👨‍💼',
        title: 'Coach Management',
        description: 'Manage and oversee all coaches, assign responsibilities, and track performance.',
        features: ['Coach assignments', 'Performance reviews', 'Resource allocation']
    },
    {
        id: 'head-coach-team-management',
        parties: ['head-coach'],
        filter: 'team-management',
        image: '👥',
        title: 'Team Management',
        description: 'Organize teams, manage rosters, and coordinate team activities.',
        features: ['Team rosters', 'Schedule coordination', 'Team analytics']
    },
    {
        id: 'head-coach-advanced-analytics',
        parties: ['head-coach'],
        filter: 'advanced-analytics',
        image: '📊',
        title: 'Advanced Analytics',
        description: 'Comprehensive analytics across all coaches, students, and programs.',
        features: ['Program performance', 'Coach effectiveness', 'Strategic insights']
    },
    // Admin use cases
    {
        id: 'admin-facility-operations',
        parties: ['admin'],
        filter: 'operations',
        image: '🏢',
        title: 'Facility Operations',
        description: 'Streamline court management, member services, and facility operations.',
        features: ['Court management', 'Member portal', 'Revenue analytics']
    },
    {
        id: 'admin-user-management',
        parties: ['admin'],
        filter: 'user-management',
        image: '👤',
        title: 'User Management',
        description: 'Manage user accounts, permissions, and access controls across the platform.',
        features: ['Account management', 'Role assignments', 'Access controls']
    },
    {
        id: 'admin-system-settings',
        parties: ['admin'],
        filter: 'system-settings',
        image: '⚙️',
        title: 'System Settings',
        description: 'Configure system-wide settings, integrations, and platform preferences.',
        features: ['Platform configuration', 'Integration management', 'System preferences']
    },
    {
        id: 'admin-revenue-analytics',
        parties: ['admin'],
        filter: 'operations',
        image: '📈',
        title: 'Revenue Analytics',
        description: 'Track revenue, analyze trends, and optimize facility operations.',
        features: ['Revenue reports', 'Usage analytics', 'Performance metrics']
    },
    // Customer Success Manager use cases
    {
        id: 'cs-member-portal',
        parties: ['customer-success'],
        filter: 'members',
        image: '👤',
        title: 'Member Portal',
        description: 'Provide members with easy access to bookings, payments, and facility info.',
        features: ['Member profiles', 'Booking history', 'Payment management']
    },
    {
        id: 'cs-support-tools',
        parties: ['customer-success'],
        filter: 'support',
        image: '💬',
        title: 'Support Tools',
        description: 'Manage customer inquiries, tickets, and provide timely support.',
        features: ['Ticket management', 'Customer communication', 'Issue resolution']
    },
    {
        id: 'cs-customer-analytics',
        parties: ['customer-success'],
        filter: 'customer-analytics',
        image: '📊',
        title: 'Customer Analytics',
        description: 'Track customer satisfaction, engagement, and retention metrics.',
        features: ['Satisfaction scores', 'Engagement metrics', 'Retention analysis']
    },
    // Content Manager use cases
    {
        id: 'cm-tournament-organization',
        parties: ['content-manager'],
        filter: 'tournaments',
        image: '🏆',
        title: 'Tournament Organization',
        description: 'Organize and manage tournaments with registrations, brackets, and scoring.',
        features: ['Registration system', 'Bracket generation', 'Live scoring']
    },
    {
        id: 'cm-content-management',
        parties: ['content-manager'],
        filter: 'content',
        image: '📝',
        title: 'Content Management',
        description: 'Create, edit, and manage platform content including articles, videos, and resources.',
        features: ['Content creation', 'Media library', 'Content scheduling']
    },
    {
        id: 'cm-event-management',
        parties: ['content-manager'],
        filter: 'events',
        image: '📅',
        title: 'Event Management',
        description: 'Plan, organize, and manage events, workshops, and special programs.',
        features: ['Event planning', 'Registration management', 'Event promotion']
    },
    // New use case: First contact with Academy (involves multiple parties)
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
                action: 'Requests a Coaching through Academy'
            },
            {
                party: 'CSM',
                action: 'Consults'
            },
            {
                party: 'CSM',
                action: 'Schedules first session with coach',
                details: 'Finds a time slot, free coach and court'
            },
            {
                party: 'Coach',
                action: 'Session takes place'
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
