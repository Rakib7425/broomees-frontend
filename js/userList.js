document.addEventListener("DOMContentLoaded", () => {
	// console.log("Dom Loaded");
	let tableData = [];
	const getData = async () => {
		document.getElementById("loading").innerText = `Loading...`;
		let headersList = {
			Accept: "*/*",
		};

		// let response = await fetch("http://localhost:8080/api/v1/user/getAllUsers", {
		let response = await fetch(
			"https://broomees-backend.onrender.com/api/v1/user/getAllUsers",
			{
				method: "GET",
				headers: headersList,
			}
		);

		let data = await response.json();
		// console.log(data);
		tableData = data.data.users;
		if (tableData.length < 1) {
			document.getElementById(
				"title"
			).innerHTML = `<h1 class="title" id="title"  style="margin-top: 5rem;">No User Found</h1> `;

			document.getElementById("table").style.display = `none`;

			console.log(tableData, "hello");
		} else {
			const table = document.getElementById("table-data");
			tableData.forEach((user) => {
				let newRow = document.createElement("tr");
				let fullName = user.name;

				newRow.innerHTML = `
                    <td>${fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                `;
				table.appendChild(newRow);
			});
		}
		document.getElementById("loading").innerText = ``;
	};
	getData();
});
