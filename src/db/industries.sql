PGDMP  )    -    	             |            endorse    16.1    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    endorse    DATABASE     i   CREATE DATABASE endorse WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE endorse;
                postgres    false            �            1259    82606 
   industries    TABLE     ]   CREATE TABLE public.industries (
    id integer NOT NULL,
    name character varying(255)
);
    DROP TABLE public.industries;
       public         heap    postgres    false            �            1259    82605    industries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.industries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.industries_id_seq;
       public          postgres    false    246            �           0    0    industries_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.industries_id_seq OWNED BY public.industries.id;
          public          postgres    false    245            I           2604    82609    industries id    DEFAULT     n   ALTER TABLE ONLY public.industries ALTER COLUMN id SET DEFAULT nextval('public.industries_id_seq'::regclass);
 <   ALTER TABLE public.industries ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    246    246            �          0    82606 
   industries 
   TABLE DATA           .   COPY public.industries (id, name) FROM stdin;
    public          postgres    false    246   f
       �           0    0    industries_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.industries_id_seq', 1, false);
          public          postgres    false    245            K           2606    82611    industries industries_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.industries
    ADD CONSTRAINT industries_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.industries DROP CONSTRAINT industries_pkey;
       public            postgres    false    246            �      x���Ko$�q��՟�N���zuW9|ͬ�!Mrg��.��dw-��Z� �u��jWȀ!6d/��VZY�ze.d�2�w��K�>����ʬ��Y]fXYYYY������FC�q^.���I�����s�Ƴ$�Ų�9�+�k^����}�gs��i2v��KK��e�%Wu�dӞ�l�Ǽ,�����F�8��b�]^&Ӭ؝�br�С=PH}��<��*�3��~�O�3^\'x��uVQ���=�'YRV��|�S�z���{�r*g�b��.F�k^TI��L��ٞɸN1/��;3>O���=[�ou�[�N��m����E��1�v���b�}�*��hv�YYq��ȧ�Sw6�s�U=ϧ�)��K�}����yj��3���I��1�)/�=�V�����3>K�iW�^��y�'�o�y����NY6�FB�;�K1?��WjfŘM�6�%s�l��I�M#ySL��1�I^V!��dχ��J�>p�Y9�~��Qŀn�	Ͷ�r�R(bAk'E,��,��0e4�"�S\��>�sN:Z�P|���N�1�w�=��������|��v	�b�����-ˬ�qh���P[�%�x��������F�\B&;���^ A�X�����{j���t�拂���[1� �,KL�� �z��b�gɄ��>`!��=� ���\��&�B�+'%���U����aP��|�ȳ5o�'���`�<bW��Aw�7�+���yı��u����Nt��~VJ�x�Lg�8�/�^�;��tRg�nv5�\��8���Г�x�ᣂ��KlW�KZ�T�1�eŖ)�H�TY6
����p2�B�Ð:A�fY���e/����9�N��(��W�K2��!5O��?OR.�.�R�v6K�A0L������+��x��a�N�4�>C��/{�MC��1	�cȬ��dY��\�u��'�\HkA05d�&�X�^�Fi�f�Cߣ���'�>�_���GdU��h�V���3�{A}�=DY�diK1C�vzR���A�V��L��oڞ�	�r��b�T�y1/{�t!G�B����s{M1S�%pv��4!&�c|�\8�]�o��+�0�Є�a�sw0vܲ���Ic�a����7�͝Svc���7B?���eKw��|#�a�n�B�{�9;I1�'��zĦ�,g���|��s�csa6��)˒�-��葺{�r���C e�N�'Ȧ���0��\"����K9�����G!����,��4gK���k��=7X�	b�I�zCH+O�L�-CZC;+��@B��Mo{�Mj�K�4[����{o�m��ԕl/���(��G��|؏�r��� ��S���%��N�H�����k������e�{
���a�!��H7��W7yq�c�\Ǧ��0����Q��3ّg��׈f]s�A�Q`�嗕|]�4���$#�QV⃥CT����[�?#�j�����hdڅ��;MZӼ�g��(�Bj1��	f�T�ܦ^�Qι�+^?TWr�����|�Ƴ<O�}yM|�?d7h�'p0�0�D]������JIMi��,�Te�cg�%��G�����
ڥu������m���YO��0]�y����-_c,�f���
�&����6�"ug�O&@G�UH\�i��mWU�p��	�f�#g%\kv�4�M���-I[[����O`�x 󽇇�5D`]ҋ������q��sB#���zSS�n��N�g=3�z����i��0��7�����=A��B�`O D����x n�l~?�W:�REAݗl~���z)���K�4��}6O�e�������P�z	~-�y�����0���+�}+��~�XG�|������ԃwm��#�$�cc�$�7
N5��ANt�|[���[P �`@�<�j�P8��F�1���-���8��r<*�ɔ�yӇEz��:fyj����x9)r�Q|�����ag��8���j>������,�BW�\%������yR!F�*�]e��tC<���Et�����W?ݝ&יP��!�a9f�V�Ç`[����<{�P֥��}p�!OJ�߀��E~Ӝ�s����Z~����D0K�z��$H�Р#"�j0����AEG )��Ǐ��X��#D���!18t��#L¤py਌��S��9G9��Ɉ��b�x�#`����<�7H��0�Ok���|��ܝc�(�w��b_�8D6���B=j�"��C焍� ��c��]9���3l�j��m"�+��n3z �9�A.0�������̢����)//��B��3Lv!�S�H�$��=^!� 
u��OA8��]ra�l6����|B_A���VDB�$e��9���3v�+j��S�S���׉0�M�*F�U:���$���z)���̓����i�N �Dw~#,��fJN�.�h-�1F�f�[o���)��?�m�_������i�8%#d�PQ��-������Գ|$�]
a�N�f*��ȓ;n/��&R\
�B8ѷ	!�9�����R�N��t��*	t�������1"�;r��4�<酡���
XXj-��ShTٱ6VF%:&YAI/�|�����=��z/
�x���~��Y}1I�
���!Ps/n9慕m|C�_'j��9�Z�v!"=�/�x�w�@�����s�E�\�u
%��N�#Z��9D�n��w/��j�y��jě03��}�)Q���B��W&�+�y��4"���p���t��h�[tAqM�&�2ْll:<��ܿL�П�v�ܗ������y��g�,z��|�ր����#��Ww���㻗w��w/_���~����~ދB��ㇿ�����|�b�C%+�g���]R2�t��͔F0tx�11~�]J�h�<{���t�����'d+x:�O�g�\�ǭt���f: "�'L��
�dK�?�ӳ� �}�Կ��^L�v��t*aS������9<��n:x�C��Ѧ�IP��pi�d�3<j���3"�P��V��9@c�y2�6�m/�Fb\���i�.�eI�.��}߷9��l�H�%�d�/����b�7(�����>��L�2���avbI��z��Wo>��7��͇_�����囏�Ϳx��'o>�L\�d�rNkZbm�}���ͨ8��"�U�������nr�9a{:�M�܏�YYfiD�&\uQ�	�|��%�)��t�k}�d�I��x� �R,2��B��3&�aj"k���t��"��)q࢓�݀��S&O�X�%�`�za	p}6=@�A<)��2���q��=�9�����HǓW�1d ;$-�i�lN.7A(8n� <�fE� ����f+�� 6�Ŋ]��5 >�RU3�]�،}��-������+��"i�]'E.�o��?�<:mR~_����x���S��zh�sՎ���~Ì#��N�\��B���d�P[f,�:7y���5'&������r�S�$,��6KJ�����B����YG@p 2��p��r���`�V6W�y2��ጂ%N�&�cM�C��l�g�XG)@�1C(�9�ʒ�6jc6��7�X�x�1O��[,�)5�v��J�G��+��Bx/.>�'��|�>�#ܢgb�����ɜ�12������gD���'�x6P��D=��$�9�$ �F�v�t��d}���q*��u�'BN��VC���x���˻ω�p�������s�������<�w�����o����ݏ�������o�����w?���������Q��ͱ�9��:ځ.-�wgm_�kQc��؊�ƴd����;u��!Ā�P�
�N�і�#�-WS�**M~�n�T�����n�wK�'5�=2�2X�����C�Ky��5�r�AJg���Pe�:)���ؐ:=�!�I�(Ѧ}T�NGP�
�TZl�)pkd�J~�u���Vޮ���:rle͢��_�qsޗL	n4�>5<�1�� �	  �v�ϔD�%�U1����*��_�O�3���2[]Ae�d��~�0!�c.�L��6�Yiq~����#��kc^�������{M�懁�O[��
]�;Xz��6\��w(�X%�xFL�I9�[��&I�U
�X������C�K"���#�>L.`��!�>�_�Sm=p��7<�v����eˁb��;cϑIM�^��>6��ɍ���!@R�n\l������6�],(�Rj��s�{(Ӕ�T�*R�V�>*�h[��䅤�.'F'���ki��l�q�SJ�_�*����e�r ���gD�B�c`�Q8X��&/���d��B�ZS�D��H�CD��
E�
<���_W��-tQ��?�BN;Z1�N0�:���$���0���T���kR��6��?���f�~��[-��?��Z�4�k��wN�5��u�{�ݒ*yAY�IRRAU�W���jrmΊDy(��4�T Y$���,{���T#�2�������v���ƜA-���Z-���A}o^H"F��Vz�1��b>�³��Y=e������#�p0|k�P�k�<�$r�׆��|g�C(�:��.
�<-	�l2˷l<�`��p��_̤���W���tB_U�*����@�RW�Q�E��mޣ����e��`�F����ȳ�y�E=U�_2 ����ߔ1�����Fŏ�ϭ$"��
Y��++�SZQ�'Pl�`L�J}u?
bl���O^z���&����'w_��I	F m���	��;懕m���4�?�;+�- ��Uq�* Dd�p8��V\g��5�kU�q�|*+�ߒ��N����E-��|�n�;�8�f�C�+�E\
"�B�sfK�(����8�>��T�)7����W1�Zײ�ףL��'5��������->�
�ذJ���De�}ط&�'2~	���DqXP�Ǆ>"&Ce�Qb7A�Û��JFr_�W:/I�я����%�8K.�z�i��`��W��墴4~%W�7����_T�Ku6�X)��c_��HS�,e�j��p��< ��:�bj#O%랱�6�(V��S
�Wʭ�+�z[�L �h�wO�#�f��;9d����sg�J��G��4���B'����I��l�`��q�힥����%�-�L��-ߪ��J/���P����q]	m��  b9�U�7 	c���ds����� V�>M�%.�s�@�4yI{N��L ����~� �	�X�֑pS ���V^>5G��~�yE�h�M?bh�U�^��[{���5^J�f!���Ym�K�����B�͝R��@��dnp��@�]nv,�OǨӺȉ����kם���"*u �ų ����]؃V���o-�ꂗ�YYy��h*xئ����✽Hd����p;Q�_s^j��p���W�^ף.$m�f��`���2W|]�}�<�(��.[%���Ȁ^#rO	Ĺ�LY�`ς+�C��<(X(t��4ʹ��O���Q�A18�� f�b U�.���BF�/���
�)�e�M�c ��8E�l�B2�CVO���R�=2ޠ�2����5�.�&�r}�)'r�ķ�΋��v�!���5�M<�S~f_��T��/u*�ʀUR�4�do00uqBU�A�ʒ} �x�~�ţ2WJA��`����A�^�T�Z6AO��ѠL�{�H�@Z+��
 �~aO���V<;i&�
�jfW�t�h�.��4ظ#w@xF����{
ߏ:����K�0�o���2~0p#��.l���/��5Kk���*P�	��V���t	= �����N"r�V��?���|��,��M��Jh�w��
�̀�&�$���"��tnYm�8p�?�A#=$о�-�Hӵ�� ��P#O�ǖ<�<�4G�V��c�K��'K|Ն������zN���Rq�9�.������&��C��҇��2����v%X��7��2�;�3^��@v�U^7YՔ���u�I��3�z��|UW'Sv�С�>��༦Z�nj�����$7A} �v�Ɯ@�`�kW�M�A4���4�;�x�<���]�)\i?l3Y��J��)WYf����#����V�n+��g�tƮ��E��.�#s�)՚2�ɴ)@���ا��S�!w&OR�S�N-z�g��cy�sF���$�-��_,�?iJ1��sTI�(3����BPs�V�SAW�-R*N�Z��p����/��#�h���pM�GX���$M����HU��u�m����j����������B�l��x�{�B	�����I�4t���S>c�7	���Kd���������T
�۩�?�� ��MP�4��f~Y�6yY%�k6~D��r$rE2w""��J������o����������������D˿��˟���z]��E���������ۗ���y���Ŀ_���s������4�H�     