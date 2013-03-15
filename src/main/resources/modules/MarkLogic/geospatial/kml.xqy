xquery version "1.0-ml";

(: Copyright (c) 2002-2009 Mark Logic Corporation. All rights reserved.
 : 
 :  This program and the accompanying materials are made available
 :  under the terms of the Eclipse Public License v1.0 which
 :  accompanies this distribution, and is available at
 :  http://www.eclipse.org/legal/epl-v10.html
 : 
 :  Contributors:
 :      Mark Logic, Inc.
 :)

module namespace kml="http://earth.google.com/kml/2.0";

declare function point ( $point as element() ) as cts:point external;
declare function box ( $box as element(kml:LatLongBox) ) as cts:box external;
declare function circle ( $radius as xs:double, $center as element() ) as cts:circle external;
declare function polygon ( $polygon-or-points as element()+ ) as cts:polygon external;
declare function interior-polygon ( $polygon as element(kml:Polygon) ) as cts:polygon* external;
declare function geospatial-query ( $regions as cts:region*, $options as xs:string*, $weight as xs:double? ) as cts:query external;
declare function geospatial-query ( $regions as cts:region*, $options as xs:string* ) as cts:query external;
declare function geospatial-query ( $regions as cts:region* ) as cts:query external;
declare function geospatial-query-from-elements ( $regions as element()*, $options as xs:string*, $weight as xs:double? ) as cts:query external;
declare function geospatial-query-from-elements ( $regions as element()*, $options as xs:string* ) as cts:query external;
declare function geospatial-query-from-elements ( $regions as element()* ) as cts:query external;

