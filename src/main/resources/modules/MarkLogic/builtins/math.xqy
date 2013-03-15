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

module namespace math="http://marklogic.com/xdmp/math";

declare function math:acos($x as xs:double) as xs:double external;
declare function math:asin($x as xs:double) as xs:double external;
declare function math:atan($x as xs:double) as xs:double external;
declare function math:atan2($y as xs:double, $x as xs:double) as xs:double external;
declare function math:ceil($x as xs:double) as xs:double external;
declare function math:cos($x as xs:double) as xs:double external;
declare function math:cosh($x as xs:double) as xs:double external;
declare function math:exp($x as xs:double) as xs:double external;
declare function math:fabs($x as xs:double) as xs:double external;
declare function math:floor($x as xs:double) as xs:double external;
declare function math:fmod($x as xs:double, $x as xs:double) as xs:double external;
declare function math:frexp($x as xs:double) as item()+ external;
declare function math:ldexp($y as xs:double, $i as xs:integer) as xs:double external;
declare function math:log($x as xs:double) as xs:double external;
declare function math:log10($x as xs:double) as xs:double external;
declare function math:modf($x as xs:double) as xs:double+ external;
declare function math:pow($x as xs:double, $y as xs:double) as xs:double external;
declare function math:sin($x as xs:double) as xs:double external;
declare function math:sinh($x as xs:double) as xs:double external;
declare function math:sqrt($x as xs:double) as xs:double external;
declare function math:tan($x as xs:double) as xs:double external;
declare function math:tanh($x as xs:double) as xs:double external;
