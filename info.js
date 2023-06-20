const infoUIPanelText = [
    {planet: "Mercury",
    temperature: "Consume at: 467°C",
    distance: "Nearest Supermarket: 58.000.000km",
    mass: "Mass: 3,285 × 10 ^ 23 kg",
    radius: "Radius: 2.439,7 km",
    orbitalPeriod: "Orbital Period 88days",
    dayLength: "Day Length: 59 days",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Venus",
    temperature: "Consume at: 464°C",
    distance: "Nearest Supermarket: 108.200.000km",
    mass: "Mass: 4,867 × 10^24 kg",
    radius: "Radius: 6051,8 km",
    orbitalPeriod: "Orbital Period: 225days",
    dayLength: "Day Length: 243 days",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Earth",
    temperature: "Consume at: 15°C",
    distance: "Nearest Supermarket: 149.597.870km",
    mass: "Mass: 5,9722 · 1024 kg",
    radius: "Radius: 6371 km",
    orbitalPeriod: "Orbital Period: 1 day",
    dayLength: "Day Length: 1 day",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Mars",
    temperature: "Consume at: -63°C",
    distance: "Nearest Supermarket: 227.900.000km",
    mass: "Mass: 6,39 × 10^23 kg",
    radius: "Radius: 3.389,5 km",
    orbitalPeriod: "Orbital Period: 687days",
    dayLength: "Day Length: 1 day 37min",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Jupiter",
    temperature: "Consume at: -150°C",
    distance: "Nearest Supermarket: 778.500.000 km",
    mass: "Mass: 1,898 × 10^27 kg",
    radius: "Radius: 69.911 km",
    orbitalPeriod: "Orbital Period: 12 years",
    dayLength: "Day Length: 9h 56min",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Saturn",
    temperature: "Consume at: -139°C",
    distance: "Nearest Supermarket: 1,434 × 10^9 km",
    mass: "Mass: 5,683 × 10^26 kg",
    radius: "Radius: 58.232 km",
    orbitalPeriod: "Orbital Period: 29 years",
    dayLength: "Day Length: 10 h 34 min",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Uranus",
    temperature: "Consume at: -214°C",
    distance: "Nearest Supermarket: 2,9377 × 10^12 m",
    mass: "Mass: 8,681 × 10^25 kg",
    radius: "25.362 km",
    orbitalPeriod: "Orbital Period: 84 years",
    dayLength: "Day Length: 17h 14min",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Neptune",
    temperature: "Consume at: −218°C",
    distance: "Nearest Supermarket: 4,495 × 10^9 km",
    mass: "Mass: 1,024 × 10^26 kg",
    radius: "Radius: 24.622 km",
    orbitalPeriod: "Orbital Period: 165 years",
    dayLength: "Day Length: 16 h 6 min",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},

    {planet: "Pluto",
    temperature: "Consume at: −233°C",
    distance: "Nearest Supermarket: 5.906.376.272 km",
    mass: "Mass: 1.303 * 10^22 kg",
    radius: "Radius: 1.188,3 km",
    orbitalPeriod: "Orbital Period: 248 years",
    dayLength: "Day Length: 153h",
    headerColor: "#ff4f19",
    backgroundColor: "#ff4f19"},
];

export function getInfoUIPanelText(index){
	let planet = infoUIPanelText[index];
	return planet;
};