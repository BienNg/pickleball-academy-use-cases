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
    'Head Coach': '🧠',
    'head-coach': '🧠',
    'Admin': '⚙️',
    'admin': '⚙️',
    'Customer Success Manager': '💬',
    'customer-success': '💬',
    'CSM': '💬',
    'Content Manager': '📝',
    'content-manager': '📝',
    'Editor': '✂️'
};

// Helper function to get party icon
function getPartyIcon(partyName) {
    return partyIcons[partyName] || '👤';
}

// Party slug for design system styling (Student, Coach, Head Coach, CSM, Editor, Admin, App)
const partySlugs = {
    'Student': 'student',
    'student': 'student',
    'Coach': 'coach',
    'coach': 'coach',
    'Head Coach': 'head-coach',
    'head-coach': 'head-coach',
    'Admin': 'admin',
    'admin': 'admin',
    'Customer Success Manager': 'csm',
    'customer-success': 'csm',
    'CSM': 'csm',
    'Content Manager': 'editor',
    'content-manager': 'editor',
    'Editor': 'editor',
    'editor': 'editor',
    'App': 'app',
    'app': 'app'
};

function getPartySlug(partyName) {
    return partySlugs[partyName] || 'editor';
}

// All user flows with parties property - each user flow can belong to multiple categories
const allUserFlows = [
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
                action: 'Records the session and sends the recording to CSM',
                mockup: 'camera-upload'
            },
            {
                party: 'CSM',
                action: 'Checks if student has paid and sends the Recordings to Editor',
                mockup: 'payment-editor'
            },
            {
                party: 'Editor',
                action: 'Uploads Recordings to App',
                mockup: 'editor-upload'
            }
        ],
        features: [
            'CSM consults and schedules first session',
            'Finds time slot, free coach and court',
            'Coach records the session',
            'CSM checks payment and sends recordings to Editor',
            'Editor uploads recordings to App'
        ]
    },
    {
        id: 'creating-session-success-clips',
        parties: ['content-manager', 'customer-success'],
        filter: 'content',
        image: '🎬',
        title: 'Creating Session Success Clips',
        description: 'Daily before-and-after transformation clips for students and social media',
        steps: [
            {
                party: 'Editor',
                action: 'Reviews All Completed Sessions',
                details: 'Editor reviews recordings from all sessions completed the previous day to identify potential transformation moments.',
                mockup: 'dashboard-view',
                stepIcon: '✂️'
            },
            {
                party: 'Editor',
                action: 'Selects Before & After Clip',
                details: 'Editor selects one clip from the beginning of the session and one improved execution after coaching.',
                mockup: 'video-thumbnail',
                stepIcon: '✂️'
            },
            {
                party: 'Editor',
                action: 'Transcribes Coaching Moment',
                details: 'Editor extracts and transcribes the specific coaching instruction related to the technical correction.',
                mockup: 'app-screen',
                stepIcon: '✂️'
            },
            {
                party: 'Editor',
                action: 'Generates AI Voice Explanation',
                details: 'Editor creates an AI voiceover explaining the technical issue and how it was corrected.',
                mockup: 'ai-voice-animation',
                stepIcon: '✂️'
            },
            {
                party: 'Editor',
                action: 'Produces 30-Second Transformation Clip',
                details: 'Editor combines before, after, transcript insight, and AI voice into a polished 30-second vertical clip.',
                mockup: 'video-thumbnail-vertical',
                stepIcon: '✂️'
            },
            {
                party: 'CSM',
                action: 'Receives Final Clip',
                details: 'Customer Success Manager receives the finished clip for review and distribution.',
                mockup: 'clip-transfer-animation',
                stepIcon: '💬'
            },
            {
                party: 'CSM',
                action: 'Sends to Student & Publishes',
                details: 'CSM sends clip to the student and publishes it on social media channels.',
                mockup: 'social-publish-screen',
                stepIcon: '💬'
            }
        ],
        features: [
            'Daily content generation process',
            'Before-and-after transformation clips',
            'AI voiceover integration',
            'Social media distribution',
            'Student engagement through progress clips'
        ]
    },
    {
        id: 'head-coach-creates-coaching-program',
        parties: ['head-coach'],
        filter: 'coaching',
        image: '🧠',
        title: 'Head Coach Creates Complete Coaching Program',
        subtitle: 'Designing a structured curriculum for every level, shot, and development stage',
        viewMode: 'Step-by-Step',
        badge: 'Internal System Flow',
        steps: [
            {
                party: 'Head Coach',
                action: 'Defines Player Level Framework',
                details: 'Head Coach defines all academy levels (Beginner → Advanced → Competitive) with clear performance criteria and progression standards.',
                mockup: 'curriculum-planning-board',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Breaks Down All Core Shots',
                details: 'Head Coach lists and categorizes every fundamental and advanced shot required across all levels.',
                mockup: 'shot-categories-animation',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Defines Technical Standards Per Shot',
                details: 'For each shot, the Head Coach defines technical checkpoints, common mistakes, and measurable improvement indicators.',
                mockup: 'shot-breakdown-document',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Designs Progressive Training Drills',
                details: 'Head Coach creates structured drills for each level and shot, progressing from isolated technique to game-realistic scenarios.',
                mockup: 'drill-progression',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Creates Evaluation & Level-Up Criteria',
                details: 'Head Coach defines standardized evaluation tests and level-up requirements for consistent player assessment.',
                mockup: 'assessment-checklist',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Compiles Master Coaching Document',
                details: 'All levels, shots, drills, and evaluation systems are consolidated into a structured master curriculum document.',
                mockup: 'master-document',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Program Approved & Locked',
                details: 'The complete coaching program is finalized and becomes the official academy training framework.',
                mockup: 'approval-stamp',
                stepIcon: '🧠'
            }
        ],
        features: [
            'Systematic curriculum design',
            'Standardized coaching framework',
            'Progressive skill development',
            'Consistent evaluation criteria',
            'Scalable training system'
        ]
    },
    {
        id: 'head-coach-creates-video-course',
        parties: ['head-coach', 'coach', 'content-manager', 'editor'],
        filter: 'content',
        image: '📚',
        title: 'Creating Complete Video Course',
        subtitle: 'Transforming the coaching program into structured in-app video lessons',
        badge: 'Internal System Flow',
        viewMode: 'Step-by-Step',
        steps: [
            {
                party: 'Head Coach',
                action: 'Defines Course Structure Based on Coaching Program',
                details: 'Head Coach translates the full curriculum into structured video modules organized by level, shot, and skill progression.',
                mockup: 'course-structure-board',
                stepIcon: '🧠'
            },
            {
                party: 'Head Coach',
                action: 'Writes Lesson Scripts & Teaching Points',
                details: 'For each shot and drill, the Head Coach defines clear teaching points, cues, demonstrations, and common mistakes to cover on camera.',
                mockup: 'lesson-script-document',
                stepIcon: '🧠'
            },
            {
                party: 'Content Manager',
                action: 'Plans Production Schedule',
                details: 'Content Manager schedules filming sessions, books courts, prepares equipment, and coordinates with filming team.',
                mockup: 'production-calendar',
                stepIcon: '📅'
            },
            {
                party: 'Coach',
                action: 'Records Video Lessons',
                details: 'Coach demonstrates techniques on court while Head Coach ensures technical accuracy and structure alignment.',
                mockup: 'video-recording-court',
                stepIcon: '🏅'
            },
            {
                party: 'Editor',
                action: 'Edits & Structures Lessons',
                details: 'Editor trims footage, adds overlays, subtitles, shot labels, slow motion breakdowns, and academy branding.',
                mockup: 'video-editing-timeline',
                stepIcon: '✂️'
            },
            {
                party: 'Head Coach',
                action: 'Reviews & Approves Final Lessons',
                details: 'Head Coach verifies technical correctness, clarity of instruction, and alignment with the official coaching program.',
                mockup: 'video-review-dashboard',
                stepIcon: '🧠'
            },
            {
                party: 'Editor',
                action: 'Uploads Course to App',
                details: 'Finalized videos are uploaded and categorized by level, shot, and topic inside the academy app.',
                mockup: 'app-course-library',
                stepIcon: '✂️'
            }
        ],
        features: [
            'Curriculum-based video structure',
            'Level-based lesson organization',
            'Scripted and standardized teaching',
            'Professional editing and overlays',
            'Structured in-app learning library'
        ]
    }
];

// Generate flowData grouped by parties (for backward compatibility and rendering)
// Each user flow appears in all categories it belongs to
function generateFlowData() {
    const categories = Object.keys(categoryLabels);
    const flowData = [];
    
    categories.forEach(category => {
        const items = allUserFlows.filter(userFlow => userFlow.parties.includes(category));
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
