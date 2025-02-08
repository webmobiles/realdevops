{{/*
Expand the name of the chart.
*/}}
{{- define "mychart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}



# virtualserver Named Template
# .root is the context that contains the global ".Values"
#       useful to access any variable
# .subdomain is the variable sent like string
{{- define "mychart.virtualserver" -}}
{{ $root := .root -}}

{{ $subdomain := .subdomain -}}
server {
  listen 443 ssl;
  ssl_certificate /etc/ssl/certs/fullchain.cer;
  ssl_certificate_key /etc/ssl/certs/cert.key;

  ssl_session_cache shared:SSL:20m;
  ssl_session_timeout 60m;
  ssl_prefer_server_ciphers off;
  ssl_protocols TLSv1.2;

    
  root /var/www/staticsites/{{$subdomain}};
  index index.html;
  server_name {{$subdomain}}.{{$root.Values.domain }};

  location ~* (?<filename>[^/]+\.(xlsx|jpg|jpeg))$ {
      #add or remove all the extensions you need.
      add_header Content-Disposition 'attachment; filename="$filename"';
  }
  location ~* \.(?:manifest|appcache|html?|xml|json)$ {
    expires -1;
    # access_log logs/static.log; # I don't usually include a static log
  }
  # redirect all suburls to /index.html (they are does not exist, just inside react app)
  location / {
      try_files $uri $uri/ /index.html;
  }

}
{{- end -}}