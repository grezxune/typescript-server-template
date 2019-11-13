import jwt from 'jsonwebtoken';

export default class Context {
    token: string;

    constructor({ req }: { req: any }) {
        this.token = req.headers.authorization;
    }

    getInsecureJWTPayload = () => {
        if (!this.token) {
            return null;
        }
        return jwt.decode(this.token);
    };

    getSecureJWTPayload = () => {
        try {
            if (this.token && this.token !== null) {
                return jwt.verify(this.token, process.env.JWT_SECRET || '', {
                    algorithms: [process.env.JWT_ALGORITHM || ''],
                });
            }
        } catch (e) {
            throw new Error('Invalid token.');
        }
    };

    getViewer = async () => {
        const jwtPayload = this.getSecureJWTPayload();

        if (jwtPayload) {
            // const user = await this.neode
            //     .first('User', {
            //         email: jwtPayload.email,
            //     })
            //     .then(res => res.toJson());
            // if (!user) {
            //     throw new Error(`User ${jwtPayload.email} does not exist.`);
            // }
            // console.log('user: ', user);
            // return user;
        }
    };
}
