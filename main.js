// TEST DATA
/*const user2 = {
    id: 30,
    name: "Dmitry Simakovich",
    role: "Front end",
    salary: 200
};

const user3 = {
    id: 40,
    name: "Valeriy Meladze",
    role: "Singer",
    salary: 300
};*/

const user1 = {
    id: 20,
    name: "John Dow",
    role: "QA",
    salary: 100
};
const apiTemplatesSet1 = [
    "/api/items/%id%/%name%",
    "/api/items/%id%/%role%",
    "/api/items/%id%/%salary%"
];

const apiPathes = apiTemplatesSet1.map(apiPathTemplate => {
    return getApiPath(user1, apiPathTemplate);
});

function getApiPath(obj, template) {
    let result = `/api/items/${obj.id}/`;

    const isGaps = (str, id) => {
        let result = str

        if (str.split(' ')) {
            result = `${str.replace(/ /, `%${id}`)}`
        }
        return result
    }

    switch (template.split('/%').pop()) {
        case 'name%': {
            result += isGaps(obj.name, obj.id)
            break;
        }
        case 'role%': {
            result += isGaps(obj.role, obj.id)
            break;
        }
        case 'salary%': {
            result += `${obj.salary}`
            break;
        }
        default: {
            result = 'Some error!'
        }
    }
    return result;
}

console.log(JSON.stringify(apiPathes));
// result at user1: ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"]
// result at user2: ["/api/items/30/Dmitry%30Simakovich","/api/items/30/Front%30end","/api/items/30/200"]
// result at user3: ["/api/items/40/Valeriy%40Meladze","/api/items/40/Singer","/api/items/40/300"]