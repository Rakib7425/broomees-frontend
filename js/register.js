document.addEventListener("DOMContentLoaded", () => {
	// console.log("Dom Loaded");
	const getStartedButton = document.getElementById("getStartedButton");

	getStartedButton.addEventListener("click", () => {
		const firstName = document.getElementById("firstName").value;
		const lastName = document.getElementById("lastName").value;
		const email = document.getElementById("inputEmail").value;
		const username = document.getElementById("username").value;
		const password = document.getElementById("inputPassword").value;
		const confirmPassword = document.getElementById("cPassword").value;

		const fullName = firstName + " " + lastName;

		handleRegister(fullName, email, username, password, confirmPassword);
	});

	const handleRegister = async (fullName, email, username, password, confirmPassword) => {
		if ((!fullName || !email || !username, !password || !confirmPassword)) {
			document.getElementById("error").innerText = `All Fields Are Required!`;
			// alert("All Fields Are Required!");
			return;
		} else if (password !== confirmPassword) {
			// alert("Confirm password not Matched!");
			document.getElementById("error").innerText = `Confirm password not Matched!`;
			return;
		} else {
			try {
				document.getElementById("error").innerText = `Loading..`;
				let headersList = {
					Accept: "*/*",
					"Content-Type": "application/json",
				};

				let bodyContent = JSON.stringify({
					name: fullName,
					username,
					email,
					password: confirmPassword,
				});

				// let response = await fetch("http://localhost:8080/api/v1/user/register", {
				let response = await fetch(
					"https://broomees-backend.onrender.com/api/v1/user/register",
					{
						method: "POST",
						body: bodyContent,
						headers: headersList,
					}
				);

				let data = await response.json();
				console.log(data);

				if (data.status) {
					document.getElementById(
						"error"
					).innerHTML = `<p class='success'>User Created Successfully!</p>`;
				} else {
					document.getElementById(
						"error"
					).innerHTML = `<p class='error'>User Already exist!</p>`;
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
});
