// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "Studying Master of Social Work",
		description:
			"Currently studying Master of Social Work,focus on 'emerging adults' and 'cosplay' and 'teenager social work'",
		type: "education",
		startDate: "2025-09-01",
		location: "Guangzhou",
		organization: "South China Agricultural University",
		skills: ["Java", "Python", "JavaScript", "HTML/CSS", "MySQL"],
		achievements: [
			"Not yet",
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "Shiroka-mizuki-blog-project",
		title: "Mizuki Personal Blog Project",
		description:
			"A personal blog website developed using the Astro framework as a practical project for learning frontend technologies.",
		type: "project",
		startDate: "2025-09-17",
		endDate: "2024-08-01",
		skills: ["Astro", "TypeScript", "Tailwind CSS", "Git"],
		achievements: [
			"Mastered modern frontend development tech stack",
			"Learned responsive design and user experience optimization",
			"Completed the full process from design to deployment",
		],
		links: [
			{
				name: "GitHub Repository",
				url: "https://github.com/wwlworks",
				type: "project",
			},
			{
				name: "Live Demo",
				url: "https://mizuki-demo.example.com",
				type: "website",
			},
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	
	{
		id: "UnderGraduate-school-graduation",
		title: "UnderGraduate school graduation",
		description:
			"Graduated from Zhujiang collage,SCAU",
		type: "education",
		startDate: "2018-09-01",
		endDate: "2022-06-30",
		location: "CongHua,Guangzhou",
		organization: "Graduated from Zhujiang collage,SCAU",
		achievements: [
			"GPA point:3.05",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
	},
	{
		id: "english-certificate",
		title: "English CET-4 Certificate",
		description:
			"Passed the College English Test Band 4, acquired basic English reading and writing skills.",
		type: "achievement",
		startDate: "2019-12-15",
		organization: "National College English Test Committee",
		achievements: [
			"CET-4 score: 538",
			"Improved English technical documentation reading ability",
			"Laid foundation for future study of foreign technical materials",
		],
		links: [
			{
				name: "CET-4 Certificate",
				url: "https://certificates.example.com/cet4",
				type: "certificate",
			},
		],
		icon: "material-symbols:translate",
		color: "#059669",
	},
	{
		id: "english-certificate",
		title: "English CET-6 Certificate",
		description:
			"Passed the College English Test Band 6, acquired basic English reading and writing skills.",
		type: "achievement",
		startDate: "2022-06-15",
		organization: "National College English Test Committee",
		achievements: [
			"CET-4 score: 438",
			"Improved English technical documentation reading ability",
			"Laid foundation for future study of foreign technical materials",
		],
		links: [
			{
				name: "CET-6 Certificate",
				url: "https://certificates.example.com/cet4",
				type: "certificate",
			},
		],
		icon: "material-symbols:translate",
		color: "#059669",
	},
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education").length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
