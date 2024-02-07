import { app } from './app';
import route from './routes/user.router';

app.use("/users", route);
