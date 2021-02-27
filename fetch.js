//1

fetch("https://api.github.com/users/SanyiToth")
    .then(response => {
        if (!response.ok) throw Error(response.statusText);
        else return response.json();
    })
    .then(data => {
        console.log("adat", data);
        console.log(data.name);
        console.log(data.bio);
        console.log(data.email);
        console.log(data.location);
        console.log(data.public_repos);  // name, bio, email, location, public_repos
    })
    .catch(error => {
        console.error("error", error);
    })


//2

let getTodos = (resource) => {
    return new Promise((resolve, reject) => {

        //async task
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);

            } else if (request.readyState === 4) {
                reject("nem sikerült lekérni az adatot!");

                //callbackFn("nem sikerült lekérni az adatot!", undefined);
            }
        });

        request.open('GET', resource);
        request.send();
    });
}

getTodos("high.json") // Promise {}
    .then(data1 => {
        console.log("data 1", data1);
        return getTodos("medium.json");
    })
    .then(
        data2 => {
            console.log("data 2", data2);
            return getTodos("low.json");
        }
    )
    .then(
        data3 => {
            console.log("data 3", data3);
        }
    )
    .catch(error => {
        console.log("error on rejected:", error);
    });

//with fetch
fetch("high.json") // Promise {}
    .then(data1 => {
        return data1.json()
    })
    .then(response => {
        console.log("data1", response)
        return fetch("medium.json")
    })
    .then(data2 => {
        return data2.json()
    })
    .then(response => {
        console.log("data2", response)
        return fetch("low.json")
    })
    .then(data3 => {
        return data3.json()
    })
    .then(response => {
        console.log("data3", response)
    })
