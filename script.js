const API_URL="https://api.github.com/users/";

const main = document.getElementById("main");
const searchBox=document.getElementById("search");

const getUser = async (username) => {
    try{
        const response = await fetch(API_URL + username);
        const data = await response.json();
        const card = 
        <div class="card">
            <div>
                <img src="${data.avatar}" alt="" />
            </div>
        </div>
        
    }
}