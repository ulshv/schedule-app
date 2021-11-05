# Schedule-app

## Starting the app

First, copy `backend/.env.example` to `backend/.env` and change default values if neccessary.
Then open 3 tabs and run the following commands in each:

```
cd backend
docker-compose up
```

```
cd backend
npm run migration:deploy
npm start
```

```
cd frontend
npm start
```

## Adding data

Import Postman collection and perform CRUD operations on Services/Schedules.

First, create a few services using `POST http://localhost:3000/api/v1/services` endpoint. Make sure you provided `x-admin-token` header which is the similar to `ADMIN_TOKEN` env variable found in `backend/.env`.

Then, you can create a few Schedules using `POST http://localhost:3000/api/v1/schedules` endpoint. This endpoint requires you to provide `x-client-uuid` header which is UUIDv4. (default value in Postman collection is `be92e045-0e55-48ed-a407-b3b352c23cb4` - you can change it or use it as well). Payload for this endpoint looks like this:

```
{
  "name": "Block social media",
  "duration": 2,
  "cron": "*/5 * * * * *",
  "date": 1636121214,
  "isRepeating": true,
  "isActive": true,
  "services": [1, 3, 4]
}
```

## Testing frontend app

After running `npm start` in frontend folder it will open up a new tab with the webapp. Paste `client-uuid` and click start. App will perform regular updates and fetch latest data from the server. When Schedule meets blocking status it will be visible via `Blocking: true` text in the component.

## Help & troubleshooting

If you have any questions regarding usage feel free to reach me out at sergey.ulyashev@gmail.com!
