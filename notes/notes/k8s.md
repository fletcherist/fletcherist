---
title: k8s
created: '2019-03-03T21:42:44.683Z'
modified: '2019-03-17T16:27:20.486Z'
---

# k8s


`kubectl delete deployment ${name}`
`kubectl create deployment ${name} --image browserless/chrome:latest`

`kubectl get pods`
`kubectl get deployments`
`kubectl`

`kubectl expose deployment ${name} --type=LoadBalancer --port=3000`




### ./browserless.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: browserless
  labels:
    app: browserless
spec:
  replicas: 3
  selector:
    matchLabels:
      app: browserless
  template:
    metadata:
      labels:
        app: browserless
    spec:
      containers:
        - name: browserless
          image: browserless/chrome:latest
          ports:
            - containerPort: 3000
          env:
            - name: PREBOOT_CHROME
              value: true
            - name: KEEP_ALIVE
              value: true
            - name: MAX_QUEUE_LENGTH
              value: true
            - name: MAX_CONCURRENT_SESSIONS
              value: 5

```


`kubectl create -f ./browserless.yaml`


## Creating a cluster on AWS

```bash
export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
export CLUSTER_NAME=browserless-cluster.k8s.local
export AWS_S3_BUCKET_STATE=browserless-cluster-state-storage
export KOPS_STATE_STORE=s3://${AWS_S3_BUCKET_STATE}
```

##### creating bucket for kubernetes config
```bash
aws s3api create-bucket \
    --bucket ${KOPS_STATE_STORE} \
    --region us-east-1
    
# if you need to delete bucket
aws s3api delete-bucket \
    --bucket ${KOPS_STATE_STORE} \
```
##### Now let's enable some versioning (to enable config changing history feature)

`aws s3api put-bucket-versioning --bucket ${AWS_S3_BUCKET_STATE}  --versioning-configuration Status=Enabled`

##### Need to find your FULL zone name for your region by using
`aws ec2 describe-availability-zones --region us-east-1`
```bash
kops create cluster \
  --zones us-east-1a \
  --state ${KOPS_STATE_STORE} \
  --name ${CLUSTER_NAME} \
  --node-size=t2.micro \
  --master-size=t2.micro \
  --node-count=2
```

##### Build cluster
`kops update cluster ${CLUSTER_NAME} --yes`


##### get config
`kops export kubecfg --state ${KOPS_STATE_STORE} --name ${CLUSTER_NAME}`

##### you should see your cluster in contexts
`kubectl config get-contexts`

##### scale cluster
`kubectl autoscale deployments/browserless --min=5 --max=15 --cpu-percent=80`
`kubectl scale deployments/browserless --replicas=3`

##### change instance type
- `kops edit instancegroup nodes`
- edit `t2.*` to anything you want
- `kops update cluster` - preview the changes
- `kops rolling-update cluster` - preview changes
- `kops rolling-update cluster --yes` - restart machines
