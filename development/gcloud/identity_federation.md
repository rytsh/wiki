## GCP Workload Identity Federation Setup

Run these commands in your terminal (make sure you have gcloud CLI installed and authenticated):

## Set your variables

```sh
export PROJECT_ID="my-gcp-project"  # Your GCP project ID
export GITHUB_ORG="rytsh"        # Your GitHub username or organization
export GITHUB_REPO="bir"         # Your repository name
export SERVICE_ACCOUNT_NAME="github-actions"
export POOL_NAME="github-pool"
export PROVIDER_NAME="github-provider"
```

## 1. Enable required APIs

```sh
gcloud services enable iamcredentials.googleapis.com --project="${PROJECT_ID}"
gcloud services enable run.googleapis.com --project="${PROJECT_ID}"
```

## 2. Create a Service Account for GitHub Actions

```sh
gcloud iam service-accounts create "${SERVICE_ACCOUNT_NAME}" \
  --display-name="GitHub Actions" \
  --project="${PROJECT_ID}"
```

## 3. Grant Cloud Run Admin role to the service account

```sh
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"
```

## 4. Grant Service Account User role (required to deploy to Cloud Run)

```sh
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

## 5. Create Workload Identity Pool

```sh
gcloud iam workload-identity-pools create "${POOL_NAME}" \
  --location="global" \
  --display-name="GitHub Actions Pool" \
  --project="${PROJECT_ID}"
```

## 6. Create Workload Identity Provider for GitHub (with required attribute condition)

```sh
gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_NAME}" \
  --location="global" \
  --workload-identity-pool="${POOL_NAME}" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='${GITHUB_ORG}/${GITHUB_REPO}'" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --project="${PROJECT_ID}"
```

## 7. Allow GitHub repo to impersonate the service account

```sh
gcloud iam service-accounts add-iam-policy-binding \
  "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}"
```

## 8. Grant Artifact Registry Reader role to the service account

```sh
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"
```

## 9. Get the values for GitHub secrets

```sh
echo ""
echo "=== Add these as GitHub Repository Secrets ==="
echo ""
echo "GCP_SERVICE_ACCOUNT:"
echo "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo ""
echo "GCP_WORKLOAD_IDENTITY_PROVIDER:"
echo "projects/$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}"
```

## 10. Example GitHub Actions workflow snippet

```yaml
      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: bir-api
          region: ${{ secrets.GCP_REGION }}
          image: ${{ secrets.GCP_ARTIFACT_REGISTRY }}/ghcr.io/rytsh/bir/api:${{ steps.version.outputs.VERSION }}
```
