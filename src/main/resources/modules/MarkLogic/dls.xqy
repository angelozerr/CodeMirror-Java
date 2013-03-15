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

module namespace dls="http://marklogic.com/xdmp/dls";

declare function dls:as-of-query($when as xs:dateTime) as cts:properties-query external;
declare function dls:author-query($author as xs:unsignedLong) as cts:properties-query external;
declare function dls:break-checkout($uri as xs:string, $deep as xs:boolean) as empty-sequence() external;
declare function dls:document-add-collections($uri as xs:string, $collections as xs:string*) as empty-sequence() external;
declare function dls:document-add-permissions($uri as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function dls:document-add-properties($uri as xs:string, $properties as element()*) as empty-sequence() external;
declare function dls:document-checkin($uri as xs:string, $deep as xs:boolean) as empty-sequence() external;
declare function dls:document-checkout($uri as xs:string, $deep as xs:boolean) as empty-sequence() external;
declare function dls:document-checkout($uri as xs:string, $deep as xs:boolean, $annotation as item()?) as empty-sequence() external;
declare function dls:document-checkout($uri as xs:string, $deep as xs:boolean, $annotation as item()?, $timeout as xs:unsignedLong?) as empty-sequence() external;
declare function dls:document-checkout-status($uri as xs:string) as element(dls:checkout)? external;
declare function dls:document-delete($uri as xs:string, $keep-old-versions as xs:boolean, $retain-history as xs:boolean) as empty-sequence() external;
declare function dls:document-extract-part($new-uri as xs:string, $element as element(), $annotation as item()*, $retain-history as xs:boolean) as xs:string* external;
declare function dls:document-extract-part($new-uri as xs:string, $element as element(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*) as xs:string* external;
declare function dls:document-extract-part($new-uri as xs:string, $element as element(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*) as xs:string* external;
declare function dls:document-extract-part($new-uri as xs:string, $element as element(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?) as xs:string* external;
declare function dls:document-extract-part($new-uri as xs:string, $element as element(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?, $forest-ids as xs:unsignedLong*) as xs:string* external;
declare function dls:document-get-permissions($uri as xs:string) as element(sec:permission)* external;
declare function dls:document-history($uri as xs:string) as  element(dls:document-history) external;
declare function dls:document-include-query($uri as xs:string) as cts:query external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node()) as xs:string* external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node(), $annotation as item()*) as xs:string* external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node(), $annotation as item()*, $permissions as element(sec:permission)*) as xs:string* external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node(), $annotation as item()*, $permissions as element(sec:permission)*, $collections as xs:string*) as xs:string* external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node(), $annotation as item()*, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?) as xs:string* external;
declare function dls:document-insert-and-manage($uri as xs:string, $deep as xs:boolean, $doc as node(), $annotation as item()*, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?, $forest-ids as xs:unsignedLong*) as xs:string* external;
declare function dls:document-is-managed($uri as xs:string) as xs:boolean external;
declare function dls:document-manage($uri as xs:string, $deep as xs:boolean) as empty-sequence() external;
declare function dls:document-manage($uri as xs:string, $deep as xs:boolean, $annotation as item()*) as empty-sequence() external;
declare function dls:document-purge($uri as xs:string, $delete as xs:boolean, $retain-history as xs:boolean) as xs:string* external;
declare function dls:document-remove-collections($uri as xs:string, $collections as xs:string*) as empty-sequence() external;
declare function dls:document-remove-permissions($uri as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function dls:document-remove-properties($uri as xs:string, $property-names as xs:QName*) as empty-sequence() external;
declare function dls:document-retention-rules($uri as xs:string) as element(dls:retention-rule)* external;
declare function dls:document-set-collections($uri as xs:string, $collections as xs:string*) as empty-sequence() external;
declare function dls:document-set-permissions($uri as xs:string, $permissions as element(sec:permission)*) as empty-sequence() external;
declare function dls:document-set-properties($uri as xs:string, $properties as element()*) as empty-sequence() external;
declare function dls:document-set-property($uri as xs:string, $property as element()) as empty-sequence() external;
declare function dls:document-set-quality($uri as xs:string, $quality as xs:int) as empty-sequence() external;
declare function dls:document-unmanage($uri as xs:string, $deep as xs:boolean, $remove-versions as xs:boolean) as empty-sequence() external;
declare function dls:document-update($uri as xs:string, $doc as node(), $annotation as item()*, $retain-history as xs:boolean) as xs:string* external;
declare function dls:document-update($uri as xs:string, $doc as node(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*) as xs:string* external;
declare function dls:document-update($uri as xs:string, $doc as node(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*) as xs:string* external;
declare function dls:document-update($uri as xs:string, $doc as node(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?) as xs:string* external;
declare function dls:document-update($uri as xs:string, $doc as node(), $annotation as item()*, $retain-history as xs:boolean, $permissions as element(sec:permission)*, $collections as xs:string*, $quality as xs:integer?, $forest-ids as xs:unsignedLong*) as xs:string* external;
declare function dls:document-version($uri as xs:string, $version-number as xs:unsignedInt) as document-node() external;
declare function dls:document-version-as-of($uri as xs:string, $as-of as xs:dateTime) as document-node() external;
declare function dls:document-version-delete($uri as xs:string, $version as xs:integer, $retain-history as xs:boolean) as empty-sequence() external;
declare function dls:document-version-query($version as xs:unsignedLong) as cts:properties-query external;
declare function dls:document-version-uri($document-uri as xs:string, $version as xs:integer) as xs:string external;
declare function dls:document-versions-query($uri as xs:string) as cts:properties-query external;
declare function dls:documents-query() as cts:properties-query external;
declare function dls:link-expand($context as node(), $ref as element(xi:include), $restriction as cts:query?) as node()* external;
declare function dls:link-references($node as node(), $restriction as cts:query?) as xs:string* external;
declare function dls:node-expand($node as node(), $restriction as cts:query?) as node() external;
declare function dls:purge($delete as xs:boolean, $retain-history as xs:boolean) as xs:string* external;
declare function dls:retention-rule($name as xs:string, $comment as item()*, $num-versions as xs:unsignedInt?, $duration as xs:duration?, $document-query-text as xs:string?, $document-query as cts:query?) as element(dls:retention-rule) external;
declare function dls:retention-rule-insert($rules as element(dls:retention-rule)*) as empty-sequence() external;
declare function dls:retention-rule-remove($names as xs:string*) as empty-sequence() external;
declare function dls:retention-rules($names as xs:string*) as element(dls:retention-rule)* external;
