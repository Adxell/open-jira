import mongoose, { mongo } from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = conneccting
 * 3 = disconnecting
*/
const mongooConnection = {
    isConnected: 0
}


export const connect = async() => {
    if ( mongooConnection.isConnected ) {
        console.log('Already connected')
        return
    }
    if ( mongoose.connections.length > 0 ) {
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if (mongooConnection.isConnected === 1 ) {
            console.log('Using previous conection')
            return
        }

        await mongoose.disconnect()
    } 
    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnection.isConnected = 1
    console.log('Connecting to database: ', process.env.MONGO_URL)
}

export const disconnect = async() => {
    if ( process.env.NODE_ENV === 'development' ) return
    if ( mongooConnection.isConnected === 0 ) return

    await mongoose.disconnect()
    mongooConnection.isConnected = 0;
    console.log('Desconected database')
}

