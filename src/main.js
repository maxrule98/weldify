document.addEventListener("DOMContentLoaded", () => {
	// Dynamic Services
	const services = [
		{
			title: "Welding Engineering",
			description:
				"Development and implementation of welding procedural documentation, methodologies, and compliance reviews.",
		},
		{
			title: "Quality Assurance & Control",
			description:
				"Implementing quality plans, inspection & test plans, and monitoring contractor compliance with ISO standards.",
		},
		{
			title: "Weld Failure Analysis",
			description:
				"Performing root cause analysis and providing recommendations to optimize welding processes.",
		},
		{
			title: "Project Management",
			description:
				"Leading multi-skilled teams and ensuring project completion within budget and timescales.",
		},
	];

	const servicesList = document.getElementById("services-list");

	services.forEach((service) => {
		const serviceDiv = document.createElement("div");
		serviceDiv.className = "service";
		serviceDiv.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
		servicesList.appendChild(serviceDiv);
	});

	// Contact Form Submission
	const contactForm = document.getElementById("contact-form");
	const formStatus = document.getElementById("form-status");

	contactForm.addEventListener("submit", async (e) => {
		sumbitContactForm(e, contactForm, formStatus);
	});
});

const sumbitContactForm = async (e, contactForm, formStatus) => {
	e.preventDefault();
	console.log("FORM SUBMITTED");

	// Basic Validation
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const message = document.getElementById("message").value;

	if (!name) {
		formStatus.textContent = "Name is required.";
		formStatus.backgroundColor = "red";
		formStatus.color = "white";
	}

	if (!email || !validateEmail(email)) {
		formStatus.textContent = "Email is required or invalid.";
		formStatus.backgroundColor = "red";
		formStatus.color = "white";
	}

	if (!message.length < 0) {
		formStatus.textContent = "Message is required.";
		formStatus.backgroundColor = "red";
		formStatus.color = "white";
	}

	// Create FormData
	const formData = new FormData();
	formData.append("name", name);
	formData.append("email", email);
	formData.append("message", message);

	try {
		const response = await fetch(
			"https://formsubmit.co/ben.unthank@weldnet.co",
			{
				method: "POST",
				body: formData,
			}
		);
		console.log(response);

		// Fetch failed
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// On success
		formStatus.textContent = `Thank you for your message, ${name}. I'll get back to you soon.`;
	} catch (err) {
		formStatus.textContent = "Something went wrong, please try again later.";
	}
};

// Email validation function
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
