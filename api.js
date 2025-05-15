document.addEventListener("DOMContentLoaded", function() {
    const infoContainer = document.getElementById('infoContainer'); 

    fetch("https://ergast.com/api/f1/drivers.json")

        .then(response => response.json())
        .then(data => {

            const drivers = data.MRData.DriverTable.Drivers;

            drivers.forEach(driver => {
                const driverElement = document.createElement('div');
                driverElement.classList.add('driver-card');
                driverElement.innerHTML = `
                    <h2>${driver.givenName} ${driver.familyName}</h2>
                    <p><strong>Número:</strong> ${driver.permanentNumber || 'N/A'}</p>
                    <p><strong>Nacimiento:</strong> ${driver.dateOfBirth}</p>
                    <p><strong>Nacionalidad:</strong> ${driver.nationality}</p>
                    <a href="${driver.url}" target="_blank">Ver en Wikipedia</a>
                `;
                infoContainer.appendChild(driverElement);
    });
        })
        .catch(error => {
            console.error('Error al cargar la información de los pilotos:', error);
            infoContainer.innerHTML = 'Error al cargar la información de los pilotos.';
        });
    });
