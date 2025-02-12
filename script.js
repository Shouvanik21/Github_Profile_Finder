const API_URL="https://api.github.com/users/";

const main = document.getElementById("main");
const searchBox=document.getElementById("search");

const getUser = async (username) => {
    try{
        const response = await fetch(`${API_URL}${username}` , {
            headers: {
                'Authorization': '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',
            }
        });
        const data = await response.json();
        const card = `
            <div class="card">
                <div class="img-container">
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

                    <div id="repo"></div>
                </div>
            </div>
        `

        main.innerHTML=card;
        getRepos(`${username}`);
        console.log(data);      
    }
    catch(error){
        console.log(error.response.status);
        if(error.response.status==400){
            createErrorCard("No profile found with this Username");
        }
    }
};

//initial call
getUser("Tuhin114");

const getRepos = async (username) => {
    try{
        const repos = document.getElementById("repo");
        const response = await fetch(`${API_URL}${username}${"/repos"}` , {
            headers: {
                'Authorization': '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',
            }
        });
        const data = await response.json();
        console.log(data);
        const first25data=data.slice(0,25);
        first25data.map((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            elem.style.backgroundColor="#80b9c8";
            elem.style.color="black";
            elem.style.fontSize="12px";
            elem.style.fontWeight="500";
            elem.style.borderRadius="15px";
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