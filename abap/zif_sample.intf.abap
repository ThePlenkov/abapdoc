" Sample interface definition
interface zif_sample public.

" sample method
methods sample_method.

" sample method with parameters
methods sample_method_with_parameters
  importing
    p1 type any
    value(p2) type any
    p3 type any optional
  exporting
    p3 type string 
  changing
    p4 type string
  returning
    value(result) type string.

endinterface.