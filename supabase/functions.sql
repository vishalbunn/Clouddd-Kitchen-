create or replace function get_most_ordered_items()
returns table(name text, count bigint) as $$
begin
  return query
  select
    mi.name,
    sum(oi.quantity) as count
  from order_items oi
  join menu_items mi on oi.menu_item_id = mi.id
  group by mi.name
  order by count desc
  limit 5;
end;
$$ language plpgsql;

create or replace function get_peak_hours()
returns table(hour text, orders bigint) as $$
begin
  return query
  select
    to_char(created_at, 'HH24') as hour,
    count(*) as orders
  from orders
  where created_at >= now() - interval '1 day'
  group by hour
  order by hour;
end;
$$ language plpgsql;

create or replace function get_peak_times_today()
returns table(hour text, orders bigint) as $$
begin
  return query
  select
    to_char(created_at, 'HH24') as hour,
    count(*) as orders
  from orders
  where created_at >= current_date
  group by hour
  order by orders desc;
end;
$$ language plpgsql;

create or replace function get_most_ordered_items_today()
returns table(name text, count bigint) as $$
begin
  return query
  select
    mi.name,
    sum(oi.quantity) as count
  from order_items oi
  join menu_items mi on oi.menu_item_id = mi.id
  join orders o on oi.order_id = o.id
  where o.created_at >= current_date
  group by mi.name
  order by count desc
  limit 5;
end;
$$ language plpgsql;

create or replace function get_avg_prep_time_today()
returns float as $$
declare
  avg_time float;
begin
  select
    avg(extract(epoch from (updated_at - created_at))) / 60
  into avg_time
  from orders
  where
    status = 'Ready'
    and created_at >= current_date;
  return avg_time;
end;
$$ language plpgsql;
