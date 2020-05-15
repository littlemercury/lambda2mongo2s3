# lambda2mongo2s3
Lambda function that connects to a remote mongo instance and backs it up to an AWS S3 bucket

See original blog post [here](https://blogs.dxc.technology/2016/06/14/using-aws-lambda-for-free-mongo-backups/) or read on below

I wrote a small javascript Web application using the Meteor framework, MongoDB, AngularJS and Google’s Material Design visual language. When code was checked in to the Master branch of our git repository, the application was automatically tested, built, containerised and deployed across cloud providers.
We decided to showcase these capabilities in the real world by releasing the app to a small boutique gym here in Sydney and using our own Continuous Integration and Continuous Deployment capabilities to update the app automatically. That is, a code push caused a new version of the application to be rolled out across all production instances. There’s nothing new here; this is the way most startups work today.
Now we have about 100 users relying on the application to track and store their workout data, and we are continuously pushing updates out. The engagement and feedback have been fantastic.
But what about the data???
In any scenario, but particularly one in which people trust you with their data, you need to have a solid backup plan in place. Backing up Mongo is simple enough — Mongo has a dump utility that will back up all your data from the command line. But what do you do with that data, and how do you ensure that it’s being reliably backed up?
Amazon’s Simple Storage Service (S3) is a very cheap object store that is reliable and easy to configure, so it was perfect for this purpose. But how do you call the Mongo instance to dump its data to S3? Luckily I wasn’t the first person to ask this question and was able to use a great node library.
I briefly considered creating a CRON job to run on my laptop and dump the data to S3, but that’s not reliable and certainly not an enterprise-grade solution, as there is no guarantee that my laptop will be running reliably.
Next I thought about firing up an AWS EC2 instance in order to set up a CRON job to run there, but having an entire instance running 24×7 for one CRON job seemed like overkill to me.
Enter Amazon Web Service’s Lambda — Amazon’s foray into serverless code. In its simplest form, Lambda allows you to run code without any specific servers. Amazon calls each instance of this a Function. Functions can be triggered by a number of events, or configured to run on a CRON schedule. Lambda also supports a variety of languages, so chances are you can achieve most simple tasks there. But the best part is that (at the time of writing…) the first million Lambda calls per month are free.
I was lucky enough to find a Node library that someone else had written to back Mongo to S3, so all I needed to do was compile it on the same version of Node and type of Linux that the AWS zone I wanted to use was running, and voila!
The Mongo DB instance we are using to track user workout data is now being backed up to an S3 Bucket every eight hours, via a Lambda function. That means, not only is the data backed up, but our client doesn’t need to worry about servers or CRON jobs.
The best part of all is the cost. The average backup is only a couple of hundred kilobytes in size, and the ~93 Lambda Function calls are way below the million monthly call threshold, keeping us on the AWS Free Tier for at least a year.
Can’t beat free!
