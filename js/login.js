document.addEventListener("DOMContentLoaded", () => {
	// console.log("Dom Loaded");
	const button = document.getElementById("signInButton");
	const errorPara = document.getElementById("error");

	const handleSignIn = async () => {
		const usernameOrEmail = document.getElementById("usernameOrEmail").value;
		const password = document.getElementById("password").value;
		try {
			let headersList = {
				Accept: "*/*",
				"Content-Type": "application/json",
			};

			let bodyContent = JSON.stringify({
				identifier: usernameOrEmail,
				password: password,
			});

			// let response = await fetch("http://localhost:8080/api/v1/user/login", {
			let response = await fetch("https://broomees-backend.onrender.com/api/v1/user/login", {
				method: "POST",
				body: bodyContent,
				headers: headersList,
			});

			let data = await response.json();

			if (data.success) {
				console.log(data);
				errorPara.innerHTML = `<p id="error" class="success">Login successful ${data?.data?.user?.name}</p>`;
			} else {
				console.log(data.message);
				errorPara.innerHTML = `<p id="error" class="error">${data?.message}</p>`;
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	button.addEventListener("click", () => {
		handleSignIn();
	});
});
