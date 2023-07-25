#ifndef _PRINTF_H
#define _PRINTF_H

#include <stdarg.h>
#include <stdio.h>
#include <unistd.h>
#include <limits.h>
#include <stdlib.h>

#define OUTPUT_BUF_SIZE 1024
#define BUF_FLUSH -1
#define NULL_STRING "(null)"
#define PARAMS_INIT {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
#define CONVERT_LOWERCASE	1
#define CONVERT_UNSIGNED	2

/**
 * struct parameters-parameters
 * @unsign: flagfor unsigned valu
 * @plus_flag: plus_flag specifier
 * @space_flag: hashtag_flag specifier
 * @hashtag_flag:underscore flag specifier
 * @zero_flag: on if _flag specifier
 * @minus_flag: minus flag specifier
 * @width: width specifier
 * @precision: precision flag
 * @h_modifier: h_modifier specifier
 * @l_modifier: l_modifier specifier
 */
typedef struct parameters
{
	unsigned int unsign			: 1;
	unsigned int plus_flag		: 1;
	unsigned int space_flag		: 1;
	unsigned int hashtag_flag	: 1;
	unsigned int zero_flag		: 1;
	unsigned int minus_flag		: 1;
	unsigned int width;
	unsigned int precision;
	unsigned int h_modifier		: 1;
	unsigned int l_modifier		: 1;
} params_t;
/**
 * struct specifier-token for specs
 * @specifier: format token
 * @f: The function associated
 */
typedef struct specifier
{
	char *specifier;
	int (*f)(va_list, params_t *);
} specifier_t;
/* _put.c module */
int _puts(char *str);
int _putchar(int c);
/* print_functions.c module */
int print_c(va_list ap, params_t *params);
int print_i(va_list ap, params_t *params);
int print_s(va_list ap, params_t *params);
int print_percent(va_list ap, params_t *params);
int print_S(va_list ap, params_t *params);
/* nums_funcs.c module */
char *_itoa(long int num, int base, int flags, params_t *params);
int print_unsigned(va_list ap, params_t *params);
int print_addr(va_list ap, params_t *params);
/* spec_flg_mod.c module */
int (*get_spec(char *s))(va_list ap, params_t *params);
int assign_print_f(char *s, va_list ap, params_t *params);
int get_flag(char *s, params_t *params);
int get_mod(char *s, params_t *params);
char *get_w(char *s, params_t *params, va_list ap);
/* converter.c module */
int print_hex(va_list ap, params_t *params);
int print_HEX(va_list ap, params_t *params);
int print_bin(va_list ap, params_t *params);
int print_oct(va_list ap, params_t *params);
/* simple_printers.c module */
int print_from_to(char *start, char *stop, char *except);
int print_reverse(va_list ap, params_t *params);
int print_rota13(va_list ap, params_t *params);
/* print_number.c module */
int _isdigit(int c);
int _strlen(char *s);
int print_number(char *str, params_t *params);
int print_number_right(char *str, params_t *params);
int print_number_left(char *str, params_t *params);
/* parameter_initiator.c module */
void initiate_parameters(params_t *params, va_list ap);
/* pricisor */
char *get_prec(char *p, params_t *params, va_list ap);

int _printf(const char *format, ...);

#endif
