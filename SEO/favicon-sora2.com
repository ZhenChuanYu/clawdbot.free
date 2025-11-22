admin@ip-172-31-29-110:/var/html/newapi$ curl -I https://sora2.com/favicon.ico
HTTP/2 200
date: Fri, 21 Nov 2025 19:48:35 GMT
content-type: image/x-icon
server: cloudflare
nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
cache-control: public, max-age=14400
last-modified: Sun, 12 Oct 2025 12:40:20 GMT
etag: W/"10be-199d86fa8d4"
vary: Accept-Encoding
report-to: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=lSIOetj8mufFNi2PR4OQd0jfsNdGXoccfa7aclouhGuPFlqjx4Y78RPdujEcp%2F2pwJF6ElruuzGq%2FQIc8wBUqU76MkPUvJY9fw%3D%3D"}]}
cf-cache-status: REVALIDATED
cf-ray: 9a22b499e90c9935-PDX
alt-svc: h3=":443"; ma=86400

admin@ip-172-31-29-110:/var/html/newapi$
