const BASE_URL = "https://projects-api-three.vercel.app/DBMS"; 

async function fetchData(apiKey, dbName, collectionName, filterCondition = {}) {
    const endpoint = `${BASE_URL}/fetch`;
    const payload = {
        API_KEY: apiKey,
        db_name: dbName,
        collection_name: collectionName,
        filter_condition: filterCondition
    };
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (response.status === 200) {
            return await response.json();
        } else {
            console.error(`Failed to fetch data. Status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function addData(apiKey, dbName, collectionName, document) {
    const endpoint = `${BASE_URL}/add_data`;
    const payload = {
        API_KEY: apiKey,
        db_name: dbName,
        collection_name: collectionName,
        document: document
    };

    try {
        await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Error adding data:", error);
    }
}

async function updateData(apiKey, dbName, collectionName, filterCondition, updateData) {
    const endpoint = `${BASE_URL}/update`;

    const payload = {
        API_KEY: apiKey,
        db_name: dbName,
        collection_name: collectionName,
        filter_condition: filterCondition,
        update_data: updateData
    };

    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 200) {
            const responseData = await response.json();
            console.log("Data updated successfully!");
            console.log("Response:", responseData);
        } else {
            console.error(`Failed to update data. Status code: ${response.status}`);
            const errorText = await response.text();
            console.error("Response:", errorText);
        }
    } catch (error) {
        console.error("Error updating data:", error);
    }
}


export { fetchData, addData , updateData};