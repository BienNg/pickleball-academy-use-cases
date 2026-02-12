// Category labels for display
const categoryLabels = {
    'student': 'Student',
    'coach': 'Coach',
    'head-coach': 'Head Coach',
    'admin': 'Admin',
    'customer-success': 'Customer Success Manager',
    'content-manager': 'Content Manager'
};

// Flow items data (navigation is derived from this - each use case = one nav item)
const flowData = [
    {
        category: 'student',
        count: 12,
        items: [
            {
                id: 'student-personalized-training',
                filter: 'training',
                image: '🎾',
                title: 'Personalized Training Programs',
                description: 'Get customized training plans tailored to your skill level, goals, and schedule.',
                features: ['Skill assessment', 'Custom routines', 'Progress tracking']
            },
            {
                id: 'student-court-booking',
                filter: 'booking',
                image: '📅',
                title: 'Easy Court Reservations',
                description: 'Book courts instantly with real-time availability. Manage your bookings seamlessly.',
                features: ['Real-time availability', 'Instant confirmation', 'Calendar sync']
            },
            {
                id: 'student-find-partners',
                filter: 'partners',
                image: '👥',
                title: 'Find Playing Partners',
                description: 'Connect with players at your skill level. Join games and build your community.',
                features: ['Skill-based matching', 'Game invitations', 'Community events']
            },
            {
                id: 'student-performance-analytics',
                filter: 'analytics',
                image: '📊',
                title: 'Performance Analytics',
                description: 'Deep insights into your game performance. Track statistics and optimize training.',
                features: ['Match statistics', 'Performance trends', 'Goal tracking']
            },
            {
                id: 'student-workout-routines',
                filter: 'training',
                image: '🏃',
                title: 'Workout Routines',
                description: 'Access curated workout routines designed specifically for pickleball players.',
                features: ['Strength training', 'Agility drills', 'Recovery exercises']
            }
        ]
    },
    {
        category: 'coach',
        count: 8,
        items: [
            {
                id: 'coach-dashboard',
                filter: 'dashboard',
                image: '👨‍🏫',
                title: 'Coach Dashboard',
                description: 'Manage your students, schedule lessons, and track progress all in one place.',
                features: ['Student management', 'Lesson scheduling', 'Progress reports']
            },
            {
                id: 'coach-video-analysis',
                filter: 'video',
                image: '📹',
                title: 'Video Analysis Tools',
                description: 'Upload and analyze gameplay videos with detailed feedback and annotations.',
                features: ['Video upload', 'Frame analysis', 'Annotation tools']
            },
            {
                id: 'coach-student-management',
                filter: 'students',
                image: '📚',
                title: 'Student Management',
                description: 'Organize student information, track attendance, and manage lesson plans.',
                features: ['Student profiles', 'Attendance tracking', 'Lesson plans']
            },
            {
                id: 'coach-payment-management',
                filter: 'dashboard',
                image: '💰',
                title: 'Payment Management',
                description: 'Handle payments, invoices, and billing for your coaching services.',
                features: ['Payment processing', 'Invoice generation', 'Payment history']
            }
        ]
    },
    {
        category: 'head-coach',
        count: 6,
        items: [
            {
                id: 'head-coach-coach-management',
                filter: 'coach-management',
                image: '👨‍💼',
                title: 'Coach Management',
                description: 'Manage and oversee all coaches, assign responsibilities, and track performance.',
                features: ['Coach assignments', 'Performance reviews', 'Resource allocation']
            },
            {
                id: 'head-coach-team-management',
                filter: 'team-management',
                image: '👥',
                title: 'Team Management',
                description: 'Organize teams, manage rosters, and coordinate team activities.',
                features: ['Team rosters', 'Schedule coordination', 'Team analytics']
            },
            {
                id: 'head-coach-advanced-analytics',
                filter: 'advanced-analytics',
                image: '📊',
                title: 'Advanced Analytics',
                description: 'Comprehensive analytics across all coaches, students, and programs.',
                features: ['Program performance', 'Coach effectiveness', 'Strategic insights']
            }
        ]
    },
    {
        category: 'admin',
        count: 10,
        items: [
            {
                id: 'admin-facility-operations',
                filter: 'operations',
                image: '🏢',
                title: 'Facility Operations',
                description: 'Streamline court management, member services, and facility operations.',
                features: ['Court management', 'Member portal', 'Revenue analytics']
            },
            {
                id: 'admin-user-management',
                filter: 'user-management',
                image: '👤',
                title: 'User Management',
                description: 'Manage user accounts, permissions, and access controls across the platform.',
                features: ['Account management', 'Role assignments', 'Access controls']
            },
            {
                id: 'admin-system-settings',
                filter: 'system-settings',
                image: '⚙️',
                title: 'System Settings',
                description: 'Configure system-wide settings, integrations, and platform preferences.',
                features: ['Platform configuration', 'Integration management', 'System preferences']
            },
            {
                id: 'admin-revenue-analytics',
                filter: 'operations',
                image: '📈',
                title: 'Revenue Analytics',
                description: 'Track revenue, analyze trends, and optimize facility operations.',
                features: ['Revenue reports', 'Usage analytics', 'Performance metrics']
            }
        ]
    },
    {
        category: 'customer-success',
        count: 8,
        items: [
            {
                id: 'cs-member-portal',
                filter: 'members',
                image: '👤',
                title: 'Member Portal',
                description: 'Provide members with easy access to bookings, payments, and facility info.',
                features: ['Member profiles', 'Booking history', 'Payment management']
            },
            {
                id: 'cs-support-tools',
                filter: 'support',
                image: '💬',
                title: 'Support Tools',
                description: 'Manage customer inquiries, tickets, and provide timely support.',
                features: ['Ticket management', 'Customer communication', 'Issue resolution']
            },
            {
                id: 'cs-customer-analytics',
                filter: 'customer-analytics',
                image: '📊',
                title: 'Customer Analytics',
                description: 'Track customer satisfaction, engagement, and retention metrics.',
                features: ['Satisfaction scores', 'Engagement metrics', 'Retention analysis']
            }
        ]
    },
    {
        category: 'content-manager',
        count: 8,
        items: [
            {
                id: 'cm-tournament-organization',
                filter: 'tournaments',
                image: '🏆',
                title: 'Tournament Organization',
                description: 'Organize and manage tournaments with registrations, brackets, and scoring.',
                features: ['Registration system', 'Bracket generation', 'Live scoring']
            },
            {
                id: 'cm-content-management',
                filter: 'content',
                image: '📝',
                title: 'Content Management',
                description: 'Create, edit, and manage platform content including articles, videos, and resources.',
                features: ['Content creation', 'Media library', 'Content scheduling']
            },
            {
                id: 'cm-event-management',
                filter: 'events',
                image: '📅',
                title: 'Event Management',
                description: 'Plan, organize, and manage events, workshops, and special programs.',
                features: ['Event planning', 'Registration management', 'Event promotion']
            }
        ]
    }
];
