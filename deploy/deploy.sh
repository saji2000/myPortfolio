#!/usr/bin/env bash
# Usage: ./deploy/deploy.sh user@your-vps-ip
# Example: ./deploy/deploy.sh root@203.0.113.42

set -euo pipefail

VPS="${1:?Usage: $0 user@host}"
REMOTE_DIR="/var/www/portfolio"

echo "==> Building..."
npm run build

echo "==> Uploading dist/ to $VPS:$REMOTE_DIR ..."
# rsync: delete removed files, compress in transit, show progress
rsync -avz --delete --progress dist/ "$VPS:$REMOTE_DIR/"

echo "==> Done. Site live at $VPS"
