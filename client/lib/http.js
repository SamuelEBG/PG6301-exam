//Custom exception, needs to have
export class HttpError extends Error {
    constructor(status, statusText) {
        super("HttpError " + statusText);
        this.status = status;
    }
}

export async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (res.status === 200) {
        return await res.json();
    } else if (res.status === 204) { //No content = no user
        return undefined;
    } else {
        throw new HttpError(res.status, res.statusText, res.body);
    }
}

export async function postJSON(path, json) {
    const res = await fetch(path, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(json),
    });
    if (!res.ok) {
        throw new HttpError(res.status, res.statusText);
    }
}

export async function putJSON(path, json) {
    const res = await fetch(path, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(json),
    });
    if (!res.ok) {
        throw new HttpError(res.status, res.statusText);
    }
}

export async function deleteJSON(path, json) {
    const res = await fetch(path, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(json),
    });
    if (!res.ok) {
        throw new HttpError(res.status, res.statusText);
    }
}