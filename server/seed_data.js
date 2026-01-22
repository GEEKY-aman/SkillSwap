// Using global fetch in Node 20+

const API_URL = 'http://localhost:5001/api';

const jobs = [
    {
        title: 'Senior Software Engineer',
        company: 'Google',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        location: 'Remote',
        type: 'Full-time',
        salary: '$140k - $220k',
        tags: ['React', 'Python', 'System Design'],
    },
    {
        title: 'Product Design Intern',
        company: 'Airbnb',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
        location: 'San Francisco, CA',
        type: 'Internship',
        salary: '$60k - $80k',
        tags: ['Figma', 'UI/UX', 'Prototyping'],
    },
    {
        title: 'Frontend Developer',
        company: 'Spotify',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$120k - $160k',
        tags: ['React', 'Redux', 'TypeScript'],
    },
    {
        title: 'Marketing Intern',
        company: 'Netflix',
        logo: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
        location: 'Los Angeles, CA',
        type: 'Internship',
        salary: '$40k - $50k',
        tags: ['Social Media', 'Content', 'SEO'],
    },
    {
        title: 'Data Analyst',
        company: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
        location: 'Seattle, WA',
        type: 'Contract',
        salary: '$90k - $120k',
        tags: ['SQL', 'Python', 'Tableau'],
    }
];

const courses = [
    {
        title: "React Native Masterclass",
        instructor: "Jordan Walke",
        rating: 4.8,
        students: 1200,
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        tags: ["Mobile", "React"]
    },
    {
        title: "Advanced CSS Grid & Flexbox",
        instructor: "Sarah Drasner",
        rating: 4.9,
        students: 3500,
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        tags: ["CSS", "Frontend"]
    },
    {
        title: "Python Data Structures",
        instructor: "Guido van Rossum",
        rating: 5.0,
        students: 8000,
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        tags: ["Python", "CS"]
    }
];

const hackathons = [
    {
        title: "Global AI Hackathon 2025",
        organizer: "OpenAI",
        date: "Mar 15 - Mar 17",
        participants: 2500,
        status: "Upcoming",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
        title: "Climate Fix Challenge",
        organizer: "GreenTech",
        date: "Apr 22",
        participants: 1200,
        status: "Live",
        image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        title: "Game Jam 2025",
        organizer: "Unity",
        date: "May 20",
        participants: 5000,
        status: "Upcoming",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
];

const quizzes = [
    {
        title: "React Native Basics",
        topic: "Mobile Dev",
        questionsCount: 15,
        duration: "20m",
        difficulty: "Easy"
    },
    {
        title: "Python Data Structures",
        topic: "Python Structures",
        questionsCount: 30,
        duration: "45m",
        difficulty: "Medium"
    },
    {
        title: "Advanced CSS Grid",
        topic: "Frontend",
        questionsCount: 25,
        duration: "40m",
        difficulty: "Easy"
    }
];

const seed = async () => {
    try {
        // 1. Register/Login User
        console.log('Authenticating...');
        let token;
        const user = {
            name: 'Seed User',
            email: 'seed@example.com',
            password: 'password123',
            role: 'admin' // Ensure role allows creating content if needed
        };

        let authRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password: user.password })
        });

        if (!authRes.ok) {
            // Try registering if login fails
            authRes = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        }

        if (!authRes.ok) {
            console.error('Authentication failed:', await authRes.text());
            return;
        }

        const authData = await authRes.json();
        token = authData.token;
        console.log('Authenticated successfully.');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        console.log('Seeding Jobs...');
        for (const job of jobs) {
            const res = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers,
                body: JSON.stringify(job)
            });
            if (!res.ok) console.error(`Failed to seed job: ${res.status} ${res.statusText}`, await res.text());
        }

        console.log('Seeding Courses...');
        for (const course of courses) {
            const res = await fetch(`${API_URL}/courses`, {
                method: 'POST',
                headers,
                body: JSON.stringify(course)
            });
            if (!res.ok) console.error(`Failed to seed course: ${res.status} ${res.statusText}`, await res.text());
        }

        console.log('Seeding Hackathons...');
        for (const hackathon of hackathons) {
            const res = await fetch(`${API_URL}/hackathons`, {
                method: 'POST',
                headers,
                body: JSON.stringify(hackathon)
            });
            if (!res.ok) console.error(`Failed to seed hackathon: ${res.status} ${res.statusText}`, await res.text());
        }

        console.log('Seeding Quizzes...');
        for (const quiz of quizzes) {
            const res = await fetch(`${API_URL}/quizzes`, {
                method: 'POST',
                headers,
                body: JSON.stringify(quiz)
            });
            if (!res.ok) console.error(`Failed to seed quiz: ${res.status} ${res.statusText}`, await res.text());
        }

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

seed();

