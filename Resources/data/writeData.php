<?

$file = fopen('./naren.html', 'wb');
fwrite( "test me", $file);
fclose( $file );

