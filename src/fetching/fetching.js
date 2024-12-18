export const POST = async (URL_API, params) => {
    try{
        const response = await fetch(URL_API, {
            method: 'POST',
            ...params
        })
        return response.json()
    }
    catch(error){
        throw error
    }
}

export const GET = async (URL_API, params) => {
    try{
        const response = await fetch(URL_API, {
            method: 'GET',
            ...params
        })
        return response.json()
    }
    catch(error){
        throw error
    }
}

const getUnnauthenticatedHeaders = () => {
    const unnauthenticatedHeaders = new Headers()
    unnauthenticatedHeaders.set('Content-Type', 'application/json')
    unnauthenticatedHeaders.set('x-api-key', '023be404-c59a-4f97-bce4-941acd7331c5')
    return unnauthenticatedHeaders
}

const getAuthenticatedHeaders = () => {
    const authenticatedHeaders = new Headers()
    authenticatedHeaders.set('Content-Type', 'application/json')
    authenticatedHeaders.set('x-api-key', '023be404-c59a-4f97-bce4-941acd7331c5')
    authenticatedHeaders.set('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`)
    return authenticatedHeaders
}

export {getAuthenticatedHeaders, getUnnauthenticatedHeaders}