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

module namespace mcgm="http://marklogic.com/geospatial/mcgm";

declare function mcgm:circle($radius as xs:double, $center as element(Dot)) as  cts:circle  external;
declare function mcgm:geospatial-query($regions as cts:region*) as  cts:query  external;
declare function mcgm:geospatial-query($regions as cts:region*, $options as xs:string*) as  cts:query  external;
declare function mcgm:geospatial-query($regions as cts:region*, $options as xs:string*, $weight as xs:double?) as  cts:query  external;
declare function mcgm:geospatial-query-from-elements($regions as element()*) as  cts:query  external;
declare function mcgm:geospatial-query-from-elements($regions as element()*, $options as xs:string*) as  cts:query  external;
declare function mcgm:geospatial-query-from-elements($regions as element()*, $options as xs:string*, $weight as xs:double?) as  cts:query  external;
declare function mcgm:point($point as element(Dot)) as  cts:point  external;
declare function mcgm:polygon($center as element(Dot)) as  cts:circle  external;
