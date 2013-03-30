module namespace xhive="http://www.x-hive.com/2001/08/xquery-function";

// file:///C:/Program%20Files/xDB-10.2.4/docs/manual/index.html#doc:topic/xquery_xml_updates.html
declare function xhive:create-library($uri as xs:string) as empty-sequence() external;	
declare function xhive:insert-into($where as node(), $what as item()*) as empty-sequence() external;
declare function xhive:insert-into-as-first($where as node(), $what as item()*) as empty-sequence() external;
declare function xhive:insert-into-as-last($where as node(), $what as item()*) as empty-sequence() external;
declare function xhive:insert-before($where as node(), $what as item()*) as empty-sequence() external;
declare function xhive:insert-after($where as node(), $what as item()*) as empty-sequence() external;	
declare function xhive:insert-document($uri as xs:string, $document as document-node()) as empty-sequence() external;
declare function xhive:remove($nodes as node()*) as empty-sequence() external;
declare function xhive:remove-library($uri as xs:string) as empty-sequence() external;
declare function xhive:rename-to($what as node(), $newName as xs:QName) as empty-sequence() external;
declare function xhive:replace-value-of($where as node(), $newContents as item()*) as empty-sequence() external;
declare function xhive:move($target as node(), $sources as node()*) as empty-sequence() external;
declare function xhive:move($target as node(), $anchor as node()?, $sources as node()*) as empty-sequence() external;

// file:///C:/Program%20Files/xDB-10.2.4/docs/manual/index.html#doc:topic/xquery_extension_functions.html
declare function xhive:fts($context as node(), $query as xs:string, $options as xs:string) as xs:boolean external;
declare function xhive:evaluate($query as xs:string) as item()* external;
declare function xhive:parse($doc-text as xs:string, $schema-hint as xs:string) as document-node() external;
declare function xhive:parse($doc-text as xs:string) as document-node() external;
declare function xhive:input() as document-node() external;
declare function xhive:java($class as xs:string, ...) as item()* external;
declare function xhive:get-nodes-by-key($library as xs:string, $indexname as xs:string, $key as xs:string) as node()* external;
declare function xhive:document-name($document as document-node()) external;
declare function xhive:document-id($document as document-node()) as xs:long external;
declare function xhive:force($items as item()*) as item()* external;
declare function xhive:version($document as document-node()*, $version as xs:string) as document-node()* external;
declare function xhive:version-property($document as document-node()*, $version as xs:string, $property as xs:string) as xs:string* external;
declare function xhive:version-ids($document as node()*[, $branchversion as xs:string]) as xs:string* external;
declare function xhive:metadata($document as document-node(), $key as xs:string) as xdt:untypedAtomic* external;
declare function xhive:highlight($arg as item()*, ...) as item()* external;
declare function xhive:created-at($uri as xs:string) as xs:dateTime external;
declare function xhive:last-modified($uri as xs:string) as xs:dateTime external;
declare function xhive:child-documents($uri as xs:string) as document-node()* external;
declare function xhive:child-uris($uri as xs:string) as xs:string* external;