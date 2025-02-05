const API_URL="https://api.github.com/users/";

const main = document.getElementById("main");
const searchBox=document.getElementById("search");

const getUser = async (username) => {
    try{
        const response = await fetch(API_URL + username);
        const data = await response.json();
        const card = `
            <div class="card">
                <div>
                    <img src="${data.avatar_url}" alt="image" class="avatar"></img>
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>

                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>

                    <div class="repo"></div>
                </div>
            </div>
        `

        main.innerHTML=card
        getRepos(username);
        console.log(data);      
    }catch(error){
        console.log(error.response.status){
            if(error.response.status==400){
                createErrorCard("NO profile found with this username");
            }
        }
    }

}