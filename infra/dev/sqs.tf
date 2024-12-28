
# Create the SQS queue
resource "aws_sqs_queue" "codeboard_sqs_queue" {
  name                       = "codeboard-messages"
  message_retention_seconds  = 86400
  visibility_timeout_seconds = 180
}

# Output the SQS queue URL
output "sqs_queue_url" {
  value = aws_sqs_queue.codeboard_sqs_queue.url
}
