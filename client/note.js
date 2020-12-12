const goToServerAsyncAwait = async () => {
    const response = await fetch('http://localhost:3001/test');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log(
            'Received data in ( goToServerAsyncAwait ) - ',
            decoder.decode(value)
        );
    }

    console.log('End response');
};

const goToServerPromise = () => {
    fetch('http://localhost:3001/test').then((response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        function next() {
            reader.read().then(({ done, value }) => {
                if (done) return;

                console.log(
                    'Received data in ( goToServerPromise ) - ',
                    decoder.decode(value)
                );
                next();
            });
        }
        next();
    });
};

goToServerPromise();
goToServerAsyncAwait();