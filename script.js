// const API_URL="https://api.github.com/users/";

const main = document.getElementById("main");
const searchBox=document.getElementById("search");

const getUser = async (username) => {
    try{
        const response = await fetch(`https://api.github.com/users/${username}` , {
            headers: {Authorization: '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'}
        });
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

        main.innerHTML=card;
        getRepos(username);
        console.log(data);      
    }
    catch(error){
        console.log(error.response.status);
        if(error.response.status==400){
            createErrorCard("No profile found with this Username");
        }
    }
}

getUser("Shouvanik21");

const getRepos = async (username) => {
    try{
        const repos = document.getElementById("repo");
        const response = await fetch(`https://api.github.com/users/${username}/repos` , {
            headers: {Authorization: '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'}
        });
        const data = await response.json();
        console.log(data);
        data.map((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        })
    }
    catch(error){
        createErrorCard("No profile found with this Username");
    }
}

const formSubmit = (e) => {
    if(searchBox.value!=""){
        getUser(searchBox.value);
        searchBox.value="";
    }
    return false;
}

searchBox.addEventListener("focusout", () => {
    formSubmit();
})

const createErrorCard = (msg) => {
    const cardHTML = `
        <div className="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML;    
}