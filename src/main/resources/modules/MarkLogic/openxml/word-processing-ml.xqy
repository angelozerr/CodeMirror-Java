xquery version "1.0";

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

module namespace ooxml="http://marklogic.com/openxml";

declare function ooxml:package-parts($package as node()) as xs:string* external;
declare function ooxml:package-parts-insert($directory as xs:string?, $package-uris as xs:string*, $package-parts as node()*) as empty-sequence() external;
declare function ooxml:package-parts-insert($directory as xs:string?, $package-uris as xs:string*, $package-parts as node()*, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function ooxml:package-parts-insert($directory as xs:string?, $package-uris as xs:string*, $package-parts as node()*, $permissions as element(sec:permission)*, $collections as xs:string*) as empty-sequence() external;
declare function ooxml:package-parts-insert($directory as xs:string?, $package-uris as xs:string*, $package-parts as node()*, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:int?) as empty-sequence() external;
declare function ooxml:package-parts-insert($directory as xs:string?, $package-uris as xs:string*, $package-parts as node()*, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:int?, $forest-ids as xs:unsignedLong*) as empty-sequence() external;
declare function ooxml:package-uris($package as node()) as xs:string* external;
