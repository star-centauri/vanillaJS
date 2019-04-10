export class Models {
    Request(options = {}) {
        return {
            method: options.method || function () { throw new Error('method is undefined') },
            headers: {
                "Content-Type": options.contentType || "application/json",
            },
            body: options.sendData
        }
    }

    MenuItems(item) {
        return {
            id: item.Id,
            title: item.Name,
            icon: item.Icon,
            subItems: item.SubItems
        }
    }
}