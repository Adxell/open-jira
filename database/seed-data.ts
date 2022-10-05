
interface seedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: seedData = {
    entries: [
        {
            description: "pending asdlasñdaskdasdpokqwepoiqwieoqwejoiasdfjasiodfjasdf",
            status:"pending",
            createAt: Date.now()
        },
        {
            description: "pending asdlasñdaskdasdpokqwepoiqwieoqwejoiasdfjasiodfjasdf",
            status:"pending",
            createAt: Date.now()
        },
        {
            description: "pending asdlasñdaskdasdpokqwepoiqwieoqwejoiasdfjasiodfjasdf",
            status:"pending",
            createAt: Date.now()
        },
        {
            description: "in-progess asdlasñdaskdasdpokqwepoiqwieoqwejoiasdfjasiodfjasdf",
            status:"in-progress",
            createAt: Date.now() - 23123
        },
        {
            description: "finished asdlasñdaskdasdpokqwepoiqwieoqwejoiasdfjasiodfjasdf",
            status:"finished",
            createAt: Date.now() - 123124
        }
    ]
}