# develop for local

```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm run start
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
