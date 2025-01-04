# develop for local

```bash
npm start
```

# deploy

```bash
npm run build
```

```bash
cp Dockerfile build
cp nginx.conf build
cp cloudbuild.yaml build
cd build
gcloud builds submit --config cloudbuild.yaml .
```
