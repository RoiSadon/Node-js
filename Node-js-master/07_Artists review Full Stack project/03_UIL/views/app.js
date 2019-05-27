function addArtist() {
    let newArtist = {
        "name": document.getElementById("new_name").value,
        "category": document.getElementById("new_category").value,
        "country": document.getElementById("new_country").value,
        "best_song": document.getElementById("new_best_song").value,
    };

    fetch("/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtist),
    })
        .then(res => {
            getAllArtist()
            document.getElementById("new_name").value = "";
            document.getElementById("new_category").value = "";
            document.getElementById("new_country").value = "";
            document.getElementById("new_best_song").value = "";
        })
        .catch(ex => console.log(ex));
}

function editArtist(){
    let artistId = document.getElementById("artist_update_id").value;
    let updatedArtist = {
        "best_song": document.getElementById("edit_best_song").value
    };

    fetch(`/api/artist/${artistId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArtist),
    })
        .then(res => {
            getAllArtist();
            document.getElementById("edit_best_song").value = "";
        })
        .catch(ex => console.log(ex));
}

function deleteArtist() {
    let artistId = document.getElementById("artist_delete_id").value;
    fetch(`/api/artist/${artistId}`, { method: "DELETE" })
        .then(res => {
            getAllArtist();
        })
        .catch(ex => console.log(ex));
}

function getAllArtist() {
    fetch("/api/artists")
        .then(res => res.json())
        .then(body => {
            let idList = "";
            let str = `
                <tr>
                    <th>name</th>
                    <th>category</th>
                    <th>country</th>                
                    <th>best_song</th>                                                           
                </tr>`;

            for (artist of body) {
                str += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.category}</td>
                    <td>${artist.country}</td>
                    <td>${artist.best_song}</td>                                                         
                </tr>
                `;
                idList += `<option value='${artist.name}'>${artist.name}</option>`;
            }
            document.getElementById("artist_update_id").innerHTML = idList;
            document.getElementById("artist_delete_id").innerHTML = idList;
            document.getElementById("artists").innerHTML = str;
        }
        )
        .catch(ex => console.log(ex));
}

getAllArtist()